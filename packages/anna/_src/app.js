/**
 * App class contains globally accessible config options and data.
 *
 * @class App
 * @static
 */
 App = {
 	/**
	 *	Base url used for fetching endpoint data.
	 *
	 *	@property baseUrl
	 *	@type {String}
	 */
	baseUrl: 'http://localhost:3000',

	/**
	 *	Set the number of times the Api package can attempt to 
	 *	fetch json data.
	 *
	 *	@property connectionRetriesAllowed
	 *	@type {Number}
	 */
	connectionRetriesAllowed: 5,

	/**
	 *	Determining the browser language using moment.js and setting it.
	 *
	 *	@property language
	 *	@type {String}
	 */
	language: moment.locale(),

	/**
	 *	The current view the app is on. This will get set within the 
	 *	created function of each view.
	 *
	 *	@property currentView
	 *	@type {String}
	 */
	currentView: false,

	/**
	 *	Enabling or disabling landing page card animation
	 *	@property animationRunning
	 *	@type {Boolean}
	 */
	animationRunning: true,

	/**
	 *	Throttle timeout - time to wait for throttled events to be called
	 *	@property throttleTimeout
	 *	@type {Number}
	 */
	throttleTimeout: 750,

	/**
	 *	Object containing a list of all Mongo Collections the app uses.
	 *
	 *	@property models
	 *	@type {Object}
	 */
	models: {
		/**
		 *	Mongo Collection that we populate from the content json
		 *
		 *	@property staticContent
		 *	@type {Mongo.Collection}
		 */
		staticContent: new Mongo.Collection('staticContent'),

		/**
		 *	Mongo Collection that we populate from the pages json
		 *
		 *	@property pages
		 *	@type {Mongo.Collection}
		 */
		pages: new Mongo.Collection('pages'),
		
		/**
		 *	Mongo Collection that we populate from the projects json
		 *
		 *	@property projects
		 *	@type {Mongo.Collection}
		 */
		projects: new Mongo.Collection('projects'),
		
		/**
		 *	Mongo Collection that we populate from the categories json
		 *
		 *	@property categories
		 *	@type {Mongo.Collection}
		 */
		categories: new Mongo.Collection('categories'),

		/**
		 *	Mongo Collection that we populate from the cardformations json
		 *
		 *	@property formations
		 *	@type {Mongo.Collection}
		 */
		formations: new Mongo.Collection('formations')
	}
};