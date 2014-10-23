/**
*	Template - components_slider
*	Callback called automatically when the template instance is created.
*	@method created
*	@return undefined
*/
Template['components_slider'].created = function() {

	console.log(this);

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
	}

});

/**
 *	Tenplate - components_slider
 *	Events
 */
Template['components_slider'].events = {
	
}