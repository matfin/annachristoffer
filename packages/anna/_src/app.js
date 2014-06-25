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
	language: moment.lang(),

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
	 *	Object containing a list of all Meteor Collections the app uses.
	 *
	 *	@property models
	 *	@type {Object}
	 */
	models: {
		/**
		 *	Meteor Collection that we populate from the content json
		 *
		 *	@property content
		 *	@type {Meteor.Collection}
		 */
		content: new Meteor.Collection('content', {connection: null}),

		/**
		 *	Meteor Collection that we populate from the pages json
		 *
		 *	@property pages
		 *	@type {Meteor.Collection}
		 */
		pages: new Meteor.Collection('pages', {connection: null}),
		
		/**
		 *	Meteor Collection that we populate from the projects json
		 *
		 *	@property projects
		 *	@type {Meteor.Collection}
		 */
		projects: new Meteor.Collection('projects', {connection: null}),
		
		/**
		 *	Meteor Collection that we populate from the categories json
		 *
		 *	@property categories
		 *	@type {Meteor.Collection}
		 */
		categories: new Meteor.Collection('categories', {connection: null}),

		/**
		 *	Meteor Collection that we populate from the cardformations json
		 *
		 *	@property formations
		 *	@type {Meteor.Collection}
		 */
		formations: new Meteor.Collection('formations', {connection: null})
	}
};