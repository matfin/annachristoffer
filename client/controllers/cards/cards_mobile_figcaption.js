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
 *	Helper functions for this template
 */
Template['cards_mobile_figcaption'].helpers({

	/**
	 *	Helper function to determine if a video is present
	 */
	isVideo: function() {
		return typeof this.videoUrl !== 'undefined';
	},

	/**
	 *	Helper function to determine if a slider is present
	 */
	isSlider: function() {
		return typeof this.slides !== 'undefined';
	},

	/**
	 *	Helper function to return the correctly sized image
	 */
	imgSource: function() {

		var imgOptions = {}
		if(typeof this.imgFileType !== 'undefined') {
			imgOptions.extension = this.imgFileType;
		}

		return Helpers.loadImageSource(this.img, imgOptions);
	},

	/**
	 *	Helper function to determine if there are any captions
	 */
	hasCaptions: function() {
		return this.captions && this.captions.length > 0;
	},

	/**
	 *	Helper function to determine if there are any intros
	 */
	hasIntro: function() {
		return this.intro;
	}

});