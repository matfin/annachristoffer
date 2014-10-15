/**
*	Template - cards_slide
*	Callback called automatically when the template instance is created.
*	@method created
*	@return undefined
*/
Template['cards_slide'].created = function() {
};

/**
*	Template - cards_slide
*	Callback called automatically when the template instance is rendered.
*	@method rendered
*	@return undefined
*/
Template['cards_slide'].rendered = function() {

};

/**
*	Template - cards_slide
*	Callback called automatically when the template instance is destroyed.
*	@method destroyed
*	@return undefined
*/
Template['cards_slide'].destroyed = function() {

};

/**
 *	Template - cards_slide
 *	Helper functions for this template
 */
Template['cards_slide'].helpers({

	/**
	 *	Helper function to return the correctly sized image
	 */
	imgSource: function() {

		// Call this automatically on window resize
		Dependencies.viewportResizeDependency.depend();

		return Helpers.loadImageSource(this.img);
	}

});

