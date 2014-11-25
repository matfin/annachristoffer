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

	/**
	 *	Set up the slider to render and handle events
	 */
	Slider.setup('.sliderContainer');

	/**
	 *	Set the currently active slide
	 */
	this.$('li', '.sliderIndicator').eq(0).addClass('active');

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
 *	Helper functions for this template
 */
Template['components_slider'].helpers({

	/**
	 *	Helper function to return the correctly sized image
	 */
	imgSource: function(img) {

		// Call this automatically on window resize
		Dependencies.viewportResizeDependency.depend();

		return Helpers.loadImageSource(img);
	},

	/**
	 *	Helper to get the width of the slider based on the number 
	 *	of slides
	 */
	sliderWidth: function() {
		return this.slides.length * 100;
	}

});

/**
 *	Tenplate - components_slider
 *	Events
 */
Template['components_slider'].events = {
	'sliderboundsreached .sliderContainer': function(e) {
		console.log('Slide bounds reached: ', e);
	},
	'slidecomplete .sliderContainer': function(e, template) {
		/**
		 *	Grab the newly active slide number
		 */
		var slideNumber = e.originalEvent.data.currentSlide;

		/**
		 *	Remove active state from all indicators
		 */
		template.$('li', '.sliderIndicator').removeClass('active');

		/**
		 *	Then apply to the correctly indexed element
		 */
		template.$('li', '.sliderIndicator').eq(slideNumber).addClass('active');

	}
}