/**
 *	Template - cards_figcaption
 *	Callback called automatically when the template instance is created.
 *	@method created
 *	@return undefined
 */
Template['cards_figcaption'].created = function() {
	this.data = Template.currentData();
};

/**
 *	Template - cards_figcaption
 *	Callback called automatically when the template instance is created.
 *	@method rendered
 *	@return undefined
 */
Template['cards_figcaption'].rendered = function() {

	var self = this;

	if(typeof this.data.video_id !== 'undefined') {
		this.autorun(function() {
			Dependencies.viewportResizeDependency.depend();
		});
	}

	/**
	 *	Pinterest links should open in a new tab/window
	 */
	this.$('a.pinterest').prop('target', '_blank');

	/** 
	 *	Check on scroll for elements that are in the viewport,
	 *	then lazy load their contents 
	 */
	this.autorun(function() {

		/**
		 *	Make this dependent on viewport scroll being changed
		 *	so it autoruns on scroll.
		 */
		Dependencies.viewportScrollDependency.depend();

		var images = self.$('img', '.mediaContainer');
		$.each(images, function(index, image) {
			Helpers.lazyLoadImage(image, 
				{
					callback: function() {
						/**
						 *	Remove the loading indicator
						 */
						$(image).prev().remove();
						/**
						 *	Then reset the image properties
						 */
						$(image).prop('src', $(image).data('src'));
						$(image).prop('height', 'auto');
						$(image).removeAttr('style');
						$(image).removeAttr('data-src');
						$(image).addClass('loaded');
					}
				}
			);
		});
	});
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

	'mouseover .mediaContainer': function(e, template) {
		template.$('a.pinterest').addClass('revealed');
	},
	'mouseout .mediaContainer': function(e, template) {
		template.$('a.pinterest').removeClass('revealed');
	}
}

/**
 *	Template - cards_figcaption
 *	Helper functions for this template
 */
Template['cards_figcaption'].helpers({

	/**
	 *	Helper function to generate a Pinterest URL
	 */
	pinterestUrl: function(parentContext) {
		var pinterest   = '//www.pinterest.com/pin/create/button/',
			url 		= escape(window.location.href),
			mediaUrl	= escape(App.mediaUrl + 'images/projects/' + Helpers.loadImageSource(this.img, {forcedSelection: '-hd'})),
			description = escape('Anna Claire Christoffer - ' + Helpers.loadMessageCode(parentContext.title));

		// console.log(mediaUrl);

		return pinterest + '?url=' + url + '&media=' + mediaUrl + '&description=' + description;
	},

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