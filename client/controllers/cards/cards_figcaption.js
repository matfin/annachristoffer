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
	var template = this;

	if(typeof this.data.video_id !== 'undefined') {
		this.computation = Deps.autorun(function() {
			Dependencies.viewportResizeDependency.depend();
		});
	}
};

/**
*	Template - cards_figcaption
*	Callback called automatically when the template instance is created.
*	@method destroyed
*	@return undefined
*/
Template['cards_figcaption'].destroyed = function() {
	if(typeof this.computation !== 'undefined') {
		this.computation.stop();
	}
};

/**
*	Template - cards_figcaption
*	Helper function to determine if a video is present
*	@method isVideo
*	@return {String}
*/
Template['cards_figcaption'].isVideo = function() {
	return typeof this.video !== 'undefined';
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
*	Helper function to return the calculated pixel height of an image.
*	This is to compensate for IE's poor support for the flex box model
*	@method imgDimension
*	@return {Object}
*/
Template['cards_figcaption'].imgDimension = function() {

	// Call this automatically on window resize
	Dependencies.viewportResizeDependency.depend();
};

/**
*	Template - cards_figcaption
*	Helper function to determine if there are any captions
*	@method hasCaptions
*	@return {Boolean}
*/
Template['cards_figcaption'].hasCaptions = function() {
	return this.captions && this.captions.length > 0;
};

/**
*	Template - cards_figcaption
*	Helper function to determine if there are any intros
*	@method hasCaptions
*	@return {Boolean}
*/
Template['cards_figcaption'].hasIntro = function() {
	return this.intro;
};