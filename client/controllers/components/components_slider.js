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

	this.slider = Slider.setup(this.$('.sliderContainer').get(0));

	/**
	 *	Set the currently active slide
	 */
	this.$('button', '.sliderIndicator').eq(0).addClass('active');

};

/**
*	Template - components_slider
*	Callback called automatically when the template instance is destroyed.
*	@method destroyed
*	@return undefined
*/
Template['components_slider'].destroyed = function() {
	delete this.slider;
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

	'click .sliderIndicator button': function(e, template) {
		
		/**
		 *	Grab the button and its index
		 */		
		var button = $(e.currentTarget),
			index = button.index();

		/**
		 *	Then go to the slide based on the index
		 */
		template.slider.goToSlide(index);

	},

	'sliderboundsreached .sliderContainer': function(e) {
		
	},
	'slidecomplete .sliderContainer': function(e, template) {

		console.log('Complete');

		/**
		 *	Grab the newly active slide number
		 */
		var slideNumber = e.originalEvent.data.currentSlide;

		/**
		 *	Remove active state from all indicators
		 */
		template.$('button', '.sliderIndicator').removeClass('active');

		/**
		 *	Then apply to the correctly indexed element
		 */
		template.$('button', '.sliderIndicator').eq(slideNumber).addClass('active');

	}
}