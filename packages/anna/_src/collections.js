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
		Content: 		new Mongo.Collection('content'),
		Pages: 			new Mongo.Collection('pages'),
		Projects: 		new Mongo.Collection('projects'),
		Categories: 	new Mongo.Collection('categories'),
		Formations: 	new Mongo.Collection('formations')	
	},

	/**
	 *	Server side base url for making HTTP calls
	 *	
	 *	@property baseURL
	 *	@type {String}
	 */
	baseURL: 'http://localhost:3000',

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