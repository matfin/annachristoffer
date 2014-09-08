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

	var template = this,
		isFullSlider = this.data.type === 'fullslider';

	$(template.find('.iosSlider')).iosSlider({
		desktopClickDrag: true,
		snapToChildren: true,
		keyboardControls: true,
		infiniteSlider: false,
		responsiveSlideContainer: true,
		responsiveSlides: true,
		navNextSelector: $(template.find('.icon-rightArrow')),
		navPrevSelector: $(template.find('.icon-leftArrow')),
		onSliderLoaded: function(args) {
			_.throttle(primeSliderSize(isFullSlider, template), 100);
		},
		onSlideChange: function(args) {
			$(template.find('button.active')).removeClass('active');
			$(template.find('.sliderPositionIndicator button')).eq(args.targetSlideNumber - 1).addClass('active');

			if(args.currentSlideNumber === args.data.numberOfSlides) {
				$(template.find('button.icon-rightArrow')).addClass('hidden');
			}
			else if(args.currentSlideNumber === 1) {
				$(template.find('button.icon-leftArrow')).addClass('hidden');
			}
			else {
				$(template.find('button')).removeClass('hidden');
			}
		},
		onSliderResize: function() {
			_.throttle(primeSliderSize(isFullSlider), 100);
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
 *	@param {String} type - the slider type
 *	@param {Object} template - the current template
 *	@return undefined
 */
var primeSliderSize = function(full, template) {

	if(typeof full === 'undefined') {
		full = false;
	}

	var width, height, minHeight;

	if(full) {
		width = $('.fullSlider').outerWidth();
		height = minHeight = $('.fullSlider').outerWidth() * 0.4;
	}
	else {
		width = $('.mediaContainer').outerWidth();
		height = minHeight = $('.mediaContainer').outerWidth() * 0.75;
	}

	$(template.find('.iosSlider')).css({
		'width': width,
		'height': height,
		'min-height': minHeight
	});

	$(template.find('.sliderPositionIndicator button')).eq(0).addClass('active');
};

/**
 *	Tenplate - components_slider
 *	Events
 */
Template['components_slider'].events = {
	'click .sliderPositionIndicator > button': function(e, template) {
		var slider = $(template.find('.iosSlider'));
		var index = $(e.target).index();
		slider.iosSlider('goToSlide', index + 1);
	}
}