Package.describe({
	summary: 'App, device and dendencies that will assist in setting up the app.',
	version: '1.5.0',
	name: 'com.annachristoffer:core'
});

Package.onUse(function(api) {

	/**
	 *	Minimum version of Meteor required
	 */
	api.versionsFrom('1.1.0.2');

	/**
	 *	Adding source files for this package (client)
	 */
	api.addFiles([
		'_src/core.es6.js',
		'_src/device.es6.js',
	], 'client');

	/**
	 *	Exporting package classes so they can be access from anywhere within the app.
	 */
	api.export('Core');
	api.export('Device');
});