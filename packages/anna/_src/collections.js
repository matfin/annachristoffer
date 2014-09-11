/**
 *	Server side component makes requests to a remote 
 *	endpoint to populate server side Mongo Collections.
 *
 *	@class Server
 *	@static
 */
Server = {

	/**
	 *	Collections to be populated with content
	 *	
	 *	@property Collections
	 *	@type {Object}
	 */
	Collections: {
		staticContent: 	new Mongo.Collection('content'),
		pages: 			new Mongo.Collection('pages'),
		projects: 		new Mongo.Collection('projects'),
		categories: 	new Mongo.Collection('categories'),
		formations: 	new Mongo.Collection('formations')	
	},

	/**
	 *	Server side base url for making HTTP calls
	 *	
	 *	@property baseURL
	 *	@type {String}
	 */
	baseURL: 'http://localhost:3000',

	/**
	 *	Function to update all server side collections
	 *
	 *	@method updateCollections()
	 *	@return {Object} - a resolved or rejected promise
	 */
	updateCollections: function() {

		var deferred = Q.defer(),
			self = this,
			url = '';

		_.each(this.Collections, function(collection) {
			
			url = self.baseURL + '/content/' + collection._name + '.json';

			console.log(url);

			self.httpFetch(url).then(function(result) {

				_.each(result.data, function(item) {
					console.log(item);
				});

				return deferred.resolve({
					status: 'ok',
					message: 'Collection updated: ' + collection._name
				});

			}).fail(function(error) {
				return deferred.rejected({
					status: 'error',
					message: 'Could not update collection: ' + collection._name,
					data: error
				});
			});

		});

		return deferred.promise;
	},

	/**
	 *	Function to load an endpoint from a given url
	 *
	 *	@method httpFetch()
	 *	@param	{String} url
	 *	@return {Object} - A resolved promise if the data was
	 *					   received or a rejected promise.
	 */
	httpFetch: function(url) {

		var deferred = Q.defer();

		HTTP.call(
			'GET',
			url,
			function(error, result) {
				if(error) {
					deferred.reject({
						status: 'error',
						data: error
					});
				}
				else {
					deferred.resolve({
						status: 'ok',
						data: result
					})
				}
			}

		);
		return deferred.promise;
	}
};