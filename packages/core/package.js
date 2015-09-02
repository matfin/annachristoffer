'use strict';

Package.describe({
	summary: 'App, device and dendencies that will assist in setting up the app.',
	version: '1.5.5',
	name: 'com.annachristoffer:core'
});

Package.onUse(function(api) {

	/**
	 *	Minimum version of Meteor required
	 */
	api.versionsFrom('1.1.0.2');

	/**
	 *	Dependencies
	 */
	api.use([
		'mongo', 
		'grigio:babel',
		'deps'
	], 'client');

	api.use([
		'grigio:babel'
	], 'server');

	/**
	 *	Node dependencies
	 */
	Npm.depends({
		'prerender-node': '2.0.2'
	});

	/**
	 *	Adding source files for this package (client)
	 */
	api.addFiles([
		'_src/core.es6.js',
		'_src/device.es6.js',
		'_src/dependencies.es6.js'
	], 'client');

	/**
	 *	Adding source files for this package (server)
 	 */
 	api.addFiles([
 		'_src/services.es6.js'
 	], 'server');
 
	/**
	 *	Exporting package classes so they can be access from anywhere within the app.
	 */
	api.export('Core');
	api.export('Device');
	api.export('Dependencies');
	api.export('Services');
});