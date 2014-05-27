/**
*	Template - cards_slide
*	Callback called automatically when the template instance is created.
*	@method created
*	@return undefined
*/
Template['cards_slide'].created = function() {
	console.log('Cards slide created');
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
*	Helper function to return the correctly sized image
*	@method imgSource
*	@return {String}
*/
Template['cards_slide'].imgSource = function() {

	// Call this automatically on window resize
	Dependencies.viewportResizeDependency.depend();

	return Helpers.loadImageSource(this.img);
};

