'use strict';

/**
 * Core class contains globally accessible config options and data.
 *
 * @class Core
 * @static
 */
let Core = {
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