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
			Dependencies.sliderLoadedDependency.changed();
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

var primeSlider = Deps.autorun(function() {

	Dependencies.viewportResizeDependency.depend();
	Dependencies.sliderLoadedDependency.depend();

	$('.iosSlider').css({
		'min-height': $('.iosSlider').outerWidth() * 0.41338 + 'px'
	});

});