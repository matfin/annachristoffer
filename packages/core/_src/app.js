'use strict';

/**
 * App class contains globally accessible config options and data.
 *
 * @class App
 * @static
 */
App = {

	/**
	 *	The current view the app is on. This will get set within the 
	 *	created function of each view.
	 *
	 *	@property currentView
	 *	@type {String}
	 */
	currentView: {
		type: false,
		id: false
	},

	/**
	 *	The current category id of the category being viewed.
	 *
	 *	@property currentCategoryId
	 *	@type {Stting}
	 */
	currentCategoryId: false,

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
	collections: {
		/**
		 *	Entries from Contentful
		 *
		 *	@property entries
		 *	@type {Mongo.Collection}
		 */
		entries: new Mongo.Collection('entries'),

		/**
		 *	Mongo Collection for processed images
		 *
		 *	@property images
		 *	@type {Mongo.Collection}
		 */
		images: new Mongo.Collection('images')
	}
};