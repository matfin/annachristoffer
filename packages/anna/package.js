Package.describe({
	summary: 'App, device and dendencies that will assist in setting up the app.'
});

Package.on_use(function(api) {

	api.use('deps', 'client');
	api.use('jquery', 'client');
	api.use('underscore', 'client');
	api.use('moment', 'client');

	api.add_files([
		'_src/app.js',
		'_src/api.js',
		'_src/dependencies.js',
		'_src/device.js'
	], 'client');

	api.export('App');
	api.export('Api');
	api.export('Dependencies');
	api.export('Device');

});