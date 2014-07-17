Package.describe({
	summary: 'A custom built HTML5 video player for this project'
});

Package.on_use(function(api) {

	/**
	 *	Including other packages
	 */
	api.use('jquery', 'client');
	api.use('moment', 'client');
	api.use('q', 'client');
	api.use('underscore', 'client');
	api.use('anna', 'client');


	/**
	 *	Adding package source files
	 */
	api.add_files([
		'_src/html5-video-player.js'
	]);

	/**
	 *	Exporting the package itself
	 */
	api.export('Video');
});