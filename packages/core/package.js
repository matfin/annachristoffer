Package.describe({
	summary: 'App, device and dendencies that will assist in setting up the app.',
	version: '1.5.0',
	name: 'core'
});

Package.onUse(function(api) {

	/**
	 *	Meteor version this package is compatible from
	 */

	/**
	 *	Including other Meteor packages
	 */
	api.use('deps', 'client');

	/**
	 *	Adding source files for this package (client)
	 */
	api.addFiles([
		'_src/app.js',
		'_src/dependencies.js',
		'_src/device.js',
		'_src/helpers.js',
		'_src/ui_helpers.js',
		'_src/social.js'
	], 'client');

	/**
	 *	Exporting package classes so they can be access from anywhere within the app.
	 */
	api.export('App');
	api.export('Dependencies');
	api.export('Device');
	api.export('Helpers');
	api.export('Social');

});