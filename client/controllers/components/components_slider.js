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
			_.throttle(primeSliderSize(), 100);
		},
		onSlideChange: function(args) {
			$('button.active').removeClass('active');
			$('.sliderPositionIndicator button').eq(args.targetSlideNumber - 1).addClass('active');

			if(args.currentSlideNumber === args.data.numberOfSlides) {
				$('button.icon-rightArrow').addClass('hidden');
			}
			else if(args.currentSlideNumber === 1) {
				$('button.icon-leftArrow').addClass('hidden');
			}
			else {
				$('button').removeClass('hidden');
			}
		},
		onSliderResize: function() {
			_.throttle(primeSliderSize(), 100);
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

/**
 *	Template - components_slider
 *	@method primeSliderSize
 *	@return undefined
 */
var primeSliderSize = function() {
	if(Device.isMobile) {
		$('.iosSlider').css({
			'min-height': $('.iosSlider').outerWidth() * 0.41338 + 'px',
		});
	}
	else {
		$('.iosSlider').css({
			'width': $('.mediaContainer').outerWidth() + 'px',
			'height': $('.mediaContainer').outerWidth() * 0.75 + 'px',
			'min-height': $('.mediaContainer').outerWidth() * 0.75 + 'px'
		});
	}

	$('.sliderPositionIndicator button').eq(0).addClass('active');
};

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