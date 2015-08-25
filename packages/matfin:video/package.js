'use strict';

Package.describe({
	summary: 'Client side video controls for HTML5 video',
	version: '0.0.1',
	name: 'matfin:video'
});

Package.onUse(function(api) {
	/**
	 *	Meteor version required
	 */ 
	api.versionsFrom('1.1.0.2');

	/**
	 *	Dependencies
	 */
	api.use([
		'grigio:babel'
	], 'client');

	/**
	 *	Source files
	 */
	api.addFiles([
		'_src/video_player.es6.js'
	], 'client');

	/** 
	 *	Exports
	 */
	api.export('Video');

});