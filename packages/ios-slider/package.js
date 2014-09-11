Package.describe({
	summary: "Touch Enabled, Responsive jQuery Horizontal Content Slider/Carousel/Image Gallery Plugin. For this project I have made this plugin into a Meteor package. I paid for this package and have the right to use it here. It is not to be redistributed withhout the consent of the original authors.",
	version: '1.3.43',
	name: 'ios-slider'
});

Package.onUse(function(api) {

	/**
	 *	Meteor version this package is compatible from
	 */

	/**
	 *	Including other Meteor libraries
	 */
	api.use('jquery', 'client');

	/**
	 *	Adding source files for this package
	 */
	api.addFiles([
		'_lib/jquery.easing-1.3.js',
		'_src/jquery.iosslider.min.js'
	], 'client');

});