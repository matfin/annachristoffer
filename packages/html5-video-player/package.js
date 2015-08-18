Package.describe({
	summary: 'A custom built HTML5 video player for this project',
	version: '1.0.0',
	name: 'html5-video-player'
});

Package.onUse(function(api) {

	/**
	 *	Meteor version this package is compatible from
	 */

	/**
	 *	Including other packages
	 */
	api.use('jquery', 'client');
	api.use('mrt:moment', 'client');
	api.use('mrt:q', 'client');
	api.use('underscore', 'client');
	api.use('com.annachristoffer:core', 'client');


	/**
	 *	Adding package source files
	 */
	api.addFiles([
		'_src/html5-video-player.js'
	]);

	/**
	 *	Exporting the package itself
	 */
	api.export('Video');
	
});