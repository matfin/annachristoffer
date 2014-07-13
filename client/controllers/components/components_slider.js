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

	var template = this;

	$('.iosSlider').iosSlider({
		desktopClickDrag: true,
		snapToChildren: true,
		keyboardControls: true,
		infiniteSlider: false,
		responsiveSlideContainer: true,
		responsiveSlides: true,
		navNextSelector: $('.icon-rightArrow'),
		navPrevSelector: $('.icon-leftArrow'),
		onSliderLoaded: function(args) {
			Dependencies.sliderLoadedDependency.changed();
		},
		onSlideChange: function(args) {
			$('button.active').removeClass('active');
			$('.sliderPositionIndicator button').eq(args.targetSlideNumber - 1).addClass('active');
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

	$('.sliderPositionIndicator button').eq(0).addClass('active');

	if(Device.isMobile) {
		$('.iosSlider').css({
			'min-height': $('.iosSlider').outerWidth() * 0.41338 + 'px',
		});
	}
	else {
		$('.iosSlider').css({
			'min-height': $('.iosSlider').outerWidth() * 0.41338 + 'px',
			'left': '16px',
			'width': $('section').outerWidth() - 16 + 'px'
		});
	}
});

/**
 *	Tenplate - components_slider
 *	Events
 */
Template['components_slider'].events = {
	'click .sliderPositionIndicator > button': function(e, template) {
		var slider = $('.iosSlider');
		var index = $(e.target).index();
		slider.iosSlider('goToSlide', index + 1);
	}
}