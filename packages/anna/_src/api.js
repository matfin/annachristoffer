/** 
Data package wrapper. This wrapper fetches data for the current browser language 
and if that language is not found, it makes up to 5 attempts to load the content 
in English as default.

@class Api
@static
**/
Api = {

	/**
	 *	Defines the number of retries that have taken place to fetch json data
	 *
	 *	@property connectionRetries
	 *	@type {Number}
	 *	@default 0
	 */
	connectionRetries: 0,

	/**
	 *	Method to fetch the content of the json files. Uses Q promises to return the data.
	 *	
	 *	@method fetch
	 *	@param {String} model - the name of the model which must match the name of the json file.
	 *	@return Q.promise
	 */
	fetch: function(model) {
		console.log('Fetch: ', model, App.language);

		var deferred = Q.defer();

		/**
		 *	assigning this to _self as it is used in anonymous functions below
		 */
		var _self = this;

		/**
		 *	Make the call to load jSon files.
		 */
		$.ajax({
			type: 'GET',
			url: '/content/' + App.language + '/' + model + '.json',
			dataType: 'json'
		}).done(function(data) {
			/**
			 *	Success: we resolve the promise
			 */
			deferred.resolve(data);

		}).fail(function(error) {

			/**
			 *	Fail: We set the language to English and try again,
			 *	up to the number of times defined in our App class.
			 */
			App.language = 'en';
			moment.lang('en');

			if(_self.connectionRetries !== App.connectionRetriesAllowed) {
				_self.connectionRetries++;
				console.log('Cannot get: ', model);
				console.log('Attempting: ', _self.connectionRetries);
				_self.fetch(model);
			}
			else {
				/**
				 *	After all attempts to source content fail, we reject the promise
				 */
				deferred.reject(error);
			}
		});

		/**
		 *	Returning the promise either resolved or rejected.
		 */
		return deferred.promise;
	}	
};