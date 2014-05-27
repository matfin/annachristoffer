Package.describe({
	summary: "Touch Enabled, Responsive jQuery Horizontal Content Slider/Carousel/Image Gallery Plugin. For this project I have made this plugin into a Meteor package. I paid for this package and have the right to use it here. It is not to be redistributed withhout the consent of the original authors."
});

Package.on_use(function(api) {

	api.use('jquery', 'client');
	api.add_files([
		'_lib/jquery.easing-1.3.js',
		'_src/jquery.iosslider.min.js'
	], 'client');
});