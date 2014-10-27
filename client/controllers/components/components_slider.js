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
	 * Setting the slider height according to the slide height
	 */

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
	
	// 'mousedown .slider': function(e, template) {

	// 	var startX = e.originalEvent.layerX;

	// 	template.$(e.currentTarget).on('mousemove', _.throttle(function(evt) {

	// 		console.log(startX, template.data.sliderOffset, evt.originalEvent.layerX);

	// 		var diff = template.data.sliderOffset - (startX - evt.originalEvent.layerX);
			
	// 		template.data.sliderOffset = diff;


	// 		$(this).velocity({
	// 			'translateX': diff + 'px'
	// 		}, {
	// 			duration: 0,
	// 			easing: 'none'
	// 		});
			
	// 	}, 10));
	// },

	// 'mouseout .slider, mouseup .slider': function(e, template) {
	// 	template.$(e.currentTarget).off('mousemove');
	// },

	// 'dragstart img': function(e, template) {
	// 	e.preventDefault();
	// }
}