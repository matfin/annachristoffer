'use strict';

Package.describe({
	summary: 'Grabs video details from the Wistia video service',
	version: '0.0.1',
	name: 'matfin:meteor-wistia'
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
		'mongo',
		'grigio:babel'
	], 'server');

	/**
	 *	Node dependencies
	 */
	Npm.depends({
		'request': '2.60.0'
	});

	/**
	 *	Source files
	 */
	api.addFiles([
		'_src/wistia.es6.js'
	], 'server');
	/**
	 *	Exports
	 */
	api.export('Wistia');
	api.export('Collection');
});

