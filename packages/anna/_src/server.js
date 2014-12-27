/**
 *	Server side component makes requests to a remote 
 *	endpoint to populate server side Mongo Collections.
 *
 *	@class Server
 *	@static
 */
Server = {

	/**
	 *	Default server side language
	 *	
	 *	@property 	language
	 *	@type 		{String}
	 */
	language: 'en',

	/**
	 *	Base url used for fetching endpoint data.
	 *
	 *	@property mediaUrl
	 *	@type {String}
	 */
	mediaUrl: 'http://media.annachristoffer.com/',

	/**
	 *	Server side base url for making HTTP calls
	 *	
	 *	@property 	baseURL
	 *	@type 		{String}
	 */
	baseURL: process.env.MEDIA_URL || 'http://localhost:3000',

	/**
	 *	dataSources to be populated with content
	 *	
	 *	@property dataSources
	 *	@type {Object}
	 */
	dataSources: {	
		staticContent: {
			collection: new Mongo.Collection('staticContent'),
			url: '/content/staticContent.json',
			publishBy: function() {
				return Server.dataSources.staticContent.collection.find();
			}
		},
		pages: {
			collection: new Mongo.Collection('pages'),
			url: '/content/pages.json',
			publishBy: function(slug, lang) {

				var query = {};

				if(typeof slug !== 'undefined' && typeof lang !== 'undefined') {
					query['slug.' + lang] = slug;
				}
				else {
					query = {};
				}

				return Server.dataSources.pages.collection.find(query);

			} 
		},
		projects: {
			collection: new Mongo.Collection('projects'),
			url: '/content/projects.json',
			publishBy: function(slug, lang) {

				var query = {};

				if(typeof slug !== 'undefined' && typeof lang !== 'undefined'){
					query['slug.' + lang] = slug;
				}
				else {
					var query = {};
				}

				return Server.dataSources.projects.collection.find(query);
			} 
		},
		categories: {
			collection: new Mongo.Collection('categories'),
			url: '/content/categories.json',
			publishBy: function(slug, lang) {

				var query = {};

				if(typeof slug !== 'undefined' && typeof lang !== 'undefined') {
					query['slug.' + lang] = slug;
				}
				else {
					query = {};
				}

				return Server.dataSources.categories.collection.find(query);
			} 
		},
		formations: {
			collection: new Mongo.Collection('formations'),
			url: '/content/formations.json',
			publishBy: function() {
				return Server.dataSources.formations.collection.find({});
			} 
		},
		meta: {
			collection: new Mongo.Collection('meta'),
			url: '/content/seo.json',
			publishBy: function() {
				return Server.dataSources.meta.collection.find({});
			} 
		}
	},

	/**
	 *	Function to update all server side collections
	 *
	 *	@method updateCollections()
	 *	@return {Object} - a resolved or rejected promise
	 */
	updateAndPublishCollections: function() {

		var deferred = Q.defer(),
			self = this,
			collectionsUpdated = 0;

		/**
		 *	Loop through each collection, fetching its data from the json 
		 *	endpoint.
		 */
		_.each(self.dataSources, function(dataSource) {
			
			/**
			 *	Clear out old collection data
			 */
			dataSource.collection.remove({});

			/**
			 *	Make Meteor HTTP Get using the function below.
			 */
			self.httpFetch(dataSource.url, function(err, res) {
				
				if(err) {
					/**
					 *	Reject promise if there was an error
					 */
					deferred.reject({
						status: 'error',
						message: 'Error fetching content for url: ' + dataSource.url,
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
						dataSource.collection.insert(item);
					});

					/**
					 *	After updating the collections with content we
					 *	will need to publish them.
					 */
					Meteor.publish(dataSource.collection._name, dataSource.publishBy);

					collectionsUpdated++;

				}

				if(collectionsUpdated === _.size(self.dataSources)) {

					/**
					 *	When we have updated all collections, resovle the promise
					 */
					deferred.resolve({
						status: 'ok',
						message: 'All collections updated',
						data: {
							collections: self.dataSource,
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
		console.log('Attempting to fetch content from: ' + this.baseURL + url);
		var res = HTTP.get(
			this.baseURL + url, 
			function(error, result) {
				cb(error, result);
			}
		);
	}
};