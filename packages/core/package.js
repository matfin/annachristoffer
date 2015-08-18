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
		'_src/app.js',
		'_src/device.js',
	], 'client');

	/**
	 *	Exporting package classes so they can be access from anywhere within the app.
	 */
	api.export('App');
	api.export('Device');
});