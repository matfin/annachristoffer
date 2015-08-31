'use srict';

/** 
 *	Server side services
 *	@class Services
 *	@static
 */
Services = {

	/** 
	 *	@class prerender
	 *	@static
	 */
	prerender: {
		/**
		 *	The token key from Meteor.settings
		 *	
		 *	@property settings
		 *	@type {String}
		 */
		settings: Meteor.settings.prerender,

		/**
		 *	The prerender.io handler
		 *
		 *	@property handler
		 *	@type {Object}
		 *	@default {Boolean} false
		 */
		handler: false,

		/** 
		 *	Function to start prerender.io
		 *
		 *	@method start
		 */
		start: function() {
			if(typeof this.settings.token === 'undefined') {
				throw new Meteor.Error('Prerender token undefined. Quitting');
				return;
			}
			console.log('Starting prerender.io service with token: ', this.settings.token);
			this.handler = Npm.require('prerender-node').set('prerenderToken', this.settings.token);
			try {
				WebApp.connectHandlers.use(this.handler);
			}
			catch(e) {
				console.log('Could not start prerender.io service: ', e);
			}
		}
	}

};