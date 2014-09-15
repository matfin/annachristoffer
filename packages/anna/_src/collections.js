/**
 *	Server side component makes requests to a remote 
 *	endpoint to populate server side Mongo Collections.
 *
 *	@class Server
 *	@static
 */
Server = {

	Fiber: Npm.require('fibers'),

	/**
	 *	Collections to be populated with content
	 *	
	 *	@property Collections
	 *	@type {Object}
	 */
	Collections: {
		staticContent: 	new Mongo.Collection('staticContent'),
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
			collectionsUpdated = 0;

		/**
		 *	Loop through each collection, fetching its data from the json 
		 *	endpoint.
		 */
		_.each(self.Collections, function(collection) {
			
			/**
			 *	Clear out old collection data
			 */
			collection.remove({});

			/**
			 *	URL endpoint containing json data. Note the name of the collection
			 *	is also the name of the json file. They need to match.
			 */
			var url = self.baseURL + '/content/' + collection._name + '.json';

			/**
			 *	Make Meteor HTTP Get using the function below.
			 */
			self.httpFetch(url, function(err, res) {
				
				if(err) {
					/**
					 *	Reject promise if there was an error
					 */
					deferred.reject({
						status: 'error',
						message: 'Error fetching content for url ' + url,
						data: err
					});
				}
				else {
					/**
					 *	Populate fetched data from json endpoint
					 */
					var jsonData = res.content;
						data = EJSON.parse(res.content);

					/**
					 *	Pick out and insert each item into its collection
					 */
					_.each(data.items, function(item) {
						collection.insert(item);
					});

					collectionsUpdated++;

				}

				if(collectionsUpdated === _.size(self.Collections)) {

					/**
					 *	When we have updated all collections, resovle the promise
					 */
					deferred.resolve({
						status: 'ok',
						message: 'All collections updated',
						data: {
							collections: self.Collections,
							count: collectionsUpdated
						}
					});
				}
			});
			
		});

		/**
		 *	Return the promise
		 */

		return deferred.promise;
	},

	/**
	 *	Function to load an endpoint from a given url
	 *
	 *	@method httpFetch()
	 *	@param	{String} url
	 *	@param 	{Function} cb - Callback in the event of an error
	 *	@return undefined
	 */
	httpFetch: function(url, cb) {

		var res = HTTP.get(
			url, 
			function(error, result) {
				cb(error, result);
			}
		);
	}
};