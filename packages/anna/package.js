Package.describe({
	summary: 'App, device and dendencies that will assist in setting up the app.',
	version: '1.1.1',
	name: 'anna'
});

Package.onUse(function(api) {

	/**
	 *	Meteor version this package is compatible from
	 */

	/**
	 *	Including other Meteor packages
	 */
	api.use('mrt:q', 		['client', 'server']);
	api.use('underscore', 	['client', 'server']);
	api.use('mongo', 		['client', 'server']);

	api.use('deps', 		'client');
	api.use('jquery', 		'client');
	api.use('ui',			'client');
	api.use('amplify',		'client');
	api.use('jeeeyul:moment-with-langs', 'client');
	

	/**
	 *	Adding source files for this package (client)
	 */
	api.addFiles([
		'_src/app.js',
		'_src/bridge.js',
		'_src/dependencies.js',
		'_src/device.js',
		'_src/helpers.js',
		'_src/ui_helpers.js',
		'_src/social.js'
	], 'client');

	/**
	 *	Adding source files for this package (server)
	 */
	api.addFiles([
		'_src/server.js',
		'_src/helpers.js'	
	], 'server');

	/**
	 *	Exporting package classes so they can be access from anywhere within the app.
	 */
	api.export('App');
	api.export('Bridge');
	api.export('Api');
	api.export('Dependencies');
	api.export('Device');
	api.export('Helpers');
	api.export('Social');
	api.export('Server');

});