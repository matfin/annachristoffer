/**
 *	Template - cards_mobile_figcaption
 *	Callback called automatically when the template instance is created.
 *	@method created
 *	@return undefined
 */
Template['cards_mobile_figcaption'].created = function() {
};

/**
 *	Template - cards_mobile_figcaption
 *	Callback called automatically when the template instance is created.
 *	@method rendered
 *	@return undefined
 */
Template['cards_mobile_figcaption'].rendered = function() {
};

/**
 *	Template - cards_mobile_figcaption
 *	Callback called automatically when the template instance is created.
 *	@method destroyed
 *	@return undefined
 */
Template['cards_mobile_figcaption'].destroyed = function() {
};

/**
 *	Template - cards_mobile_figcaption
 *	Helper function to determine if a video is present
 *	@method isVideo
 *	@return {Boolean}
 */
Template['cards_mobile_figcaption'].isVideo = function() {
	return typeof this.videoUrl !== 'undefined';
};

/**
 *	Template - cards_mobile_figcaption
 *	Helper function to determine if a slider is present
 *	@method isSlider
 *	@return {Boolean}
 */
Template['cards_mobile_figcaption'].isSlider = function() {
	return typeof this.slides !== 'undefined';
};


/**
 *	Template - cards_mobile_figcaption
 *	Helper function to return the correctly sized image
 *	@method imgSource
 *	@return {String}
 */
Template['cards_mobile_figcaption'].imgSource = function() {

	var imgOptions = {}
	if(typeof this.imgFileType !== 'undefined') {
		imgOptions.extension = this.imgFileType;
	}

	return Helpers.loadImageSource(this.img, imgOptions);
};

/**
 *	Template - cards_mobile_figcaption
 *	Helper function to determine if there are any captions
 *	@method hasCaptions
 *	@return {Boolean}
 */
Template['cards_mobile_figcaption'].hasCaptions = function() {
	return this.captions && this.captions.length > 0;
};

/**
 *	Template - cards_mobilefigcaption
 *	Helper function to determine if there are any intros
 *	@method hasCaptions
 *	@return {Boolean}
 */
Template['cards_mobile_figcaption'].hasIntro = function() {
	return this.intro;
};