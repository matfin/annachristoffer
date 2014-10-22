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

	console.log(this.$('.slide').outerHeight());

	this.$('.slider').css({
		height: this.$('.slide').outerHeight(true)
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
 *	Tenplate - components_slider
 *	Events
 */
Template['components_slider'].events = {
	
}