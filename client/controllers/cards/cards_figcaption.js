/**
*	Template - cards_figcaption
*	Callback called automatically when the template instance is created.
*	@method created
*	@return undefined
*/
Template['cards_figcaption'].created = function() {

};

/**
*	Template - cards_figcaption
*	Callback called automatically when the template instance is created.
*	@method rendered
*	@return undefined
*/
Template['cards_figcaption'].rendered = function() {
	
};

/**
*	Template - cards_figcaption
*	Callback called automatically when the template instance is created.
*	@method destroyed
*	@return undefined
*/
Template['cards_figcaption'].destroyed = function() {
	
};

/**
*	Template - cards_figcaption
*	Helper function to return the correctly sized image
*	@method imgSource
*	@return {String}
*/
Template['cards_figcaption'].imgSource = function() {

	// Call this automatically on window resize
	Dependencies.viewportResizeDependency.depend();

	return Helpers.loadImageSource(this.img);
};

/**
*	Template - cards_figcaption
*	Helper function to determine if the image has any captions
*	@method hasCaptions
*	@return {Boolean}
*/
Template['cards_figcaption'].hasCaptions = function() {
	return this.captions && this.captions.length > 0;
};
