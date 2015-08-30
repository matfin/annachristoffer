'use strict';

/**
 * Core class contains globally accessible config options and data.
 *
 * @class Core
 * @static
 */
Core = {
	/**
	 *	Object containing a list of all Mongo Collections the app uses.
	 *
	 *	@property models
	 *	@type {Object}
	 */
	collections: {
		/**
		 *	Entries with the content type of 'Project'
		 *
		 *	@property projects
		 *	@type {Mongo.Collection}
		 */
		projects: new Mongo.Collection('projects'),

		/**
		 *	Entries with the content type of 'Project Category'
		 *
		 *	@property categories
		 *	@type {Mongo.Collection}
		 */
		categories: new Mongo.Collection('categories'),

		/**
		 *	Entries with the content type of 'Page'
		 *
		 *	@property pages
		 *	@type {Mongo.Collection}
		 */
		pages: new Mongo.Collection('pages'),

		/**
		 *	Entries with the content type of 'Experience'
		 *
		 *	@property experiences
		 *	@type {Mongo.Collection}
		 */
		experiences: new Mongo.Collection('experiences'),

		/**
		 *	Mongo Collection for processed images
		 *
		 *	@property images
		 *	@type {Mongo.Collection}
		 */
		images: new Mongo.Collection('images'),

		/**
		 *	Videos from Wistia
		 *
		 *	@property videos
		 *	@type {Mongo.Collection}
		 */
		videos: new Mongo.Collection('videos')
	}
};