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
		this.autorun(function() {
			Dependencies.viewportResizeDependency.depend();
		});
	}

	Meteor.setTimeout(function() {	
		if(typeof $('figure.cards_figcaption') !== 'undefined' && $('figure.cards_figcaption').length > 0) {
			$('figure.cards_figcaption').addClass('rendered');
		}
	}, 300);
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
 *	Events
 */
Template['cards_figcaption'].events = {

	'mouseout .mediacontainer': function(e, template) {
		$('.scrub').data('canDrag', false);
	}
}

/**
 *	Template - cards_figcaption
 *	Helper functions for this template
 */
Template['cards_figcaption'].helpers({

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

		// Call this automatically on window resize
		Dependencies.viewportResizeDependency.depend();

		var imgOptions = {}
		if(typeof this.imgFileType !== 'undefined') {
			imgOptions.extension = this.imgFileType;
		}

		return Helpers.loadImageSource(this.img, imgOptions);
	},

	/**
	 *	Helper function to return the calculated pixel height of an image.
	 */
	imgDimension: function() {
		// Call this automatically on window resize
		Dependencies.viewportResizeDependency.depend();
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