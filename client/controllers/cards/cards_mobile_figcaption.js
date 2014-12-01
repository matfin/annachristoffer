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

	var self = this;

	/** 
	 *	Check on scroll for elements that are in the viewport,
	 *	then lazy load their contents 
	 */
	this.checkAndLoadImages = this.autorun(function() {

		/**
		 *	Make this dependent on viewport scroll being changed
		 *	so it autoruns on scroll.
		 */
		Dependencies.viewportScrollDependency.depend();

		var images = self.$('img', '.mobileMediaContainer');
		$.each(images, function(index, image) {
			Helpers.lazyLoadImage(image, function() {
				$(image).prev().remove();
			});
		});
	});

};

/**
 *	Template - cards_mobile_figcaption
 *	Callback called automatically when the template instance is created.
 *	@method destroyed
 *	@return undefined
 */
Template['cards_mobile_figcaption'].destroyed = function() {
	this.checkAndLoadImages.stop();
	delete this.checkAndLoadImages;
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