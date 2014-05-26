Package.describe({
	summary: 'App, device and dendencies that will assist in setting up the app.'
});

Package.on_use(function(api) {

	/**
	 *	Including other Meteor packages
	 */
	api.use('q', 'client');
	api.use('deps', 'client');
	api.use('jquery', 'client');
	api.use('underscore', 'client');
	api.use('moment', 'client');

	/**
	 *	Adding source files for this package
	 */
	api.add_files([
		'_src/app.js',
		'_src/api.js',
		'_src/dependencies.js',
		'_src/device.js',
		'_src/helpers.js'
	], 'client');

	/**
	 *	Exporting package classes so they can be access from anywhere within the app.
	 */
	api.export('App');
	api.export('Api');
	api.export('Dependencies');
	api.export('Device');
	api.export('Helpers');

});