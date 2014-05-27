/**
*	Template - components_slider
*	Callback called automatically when the template instance is created.
*	@method created
*	@return undefined
*/
Template['components_slider'].created = function() {
};

/**
*	Template - components_slider
*	Callback called automatically when the template instance is rendered.
*	@method rendered
*	@return undefined
*/
Template['components_slider'].rendered = function() {
	$('.iosSlider').iosSlider({
		desktopClickDrag: true,
		snapToChildren: true,
		keyboardControls: true,
		infiniteSlider: true,
		responsiveSlideContainer: true,
		responsiveSlides: true,
		onSliderLoaded: function(args) {
			console.log('Slider loaded: ',  args);
		}
	});
};

/**
*	Template - components_slider
*	Callback called automatically when the template instance is destroyed.
*	@method destroyed
*	@return undefined
*/
Template['components_slider'].destroyed = function() {

};