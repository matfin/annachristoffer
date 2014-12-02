/**
*	Template - cards_mobile_project
*	Callback called automatically when the template instance is created.
*	@method created
*	@return undefined
*/
Template['cards_mobile_project'].created = function() {
};

/**
*	Template - cards_mobile_project
*	Callback called automatically when the template instance is created.
*	@method rendered
*	@return undefined
*/
Template['cards_mobile_project'].rendered = function() {

	var self = this;

	/**
	 *	Lazy loading background images for the project 
	 *	cards
	 */
	this.autorun(function() {

		/**
		 *	Run this on scroll end
		 */
		Dependencies.viewportScrollDependency.depend();

		/**
		 *	Grab the data we need
		 */
		var thumbnail = self.$('div.thumbnail').get(0),
			src = $(thumbnail).data('src');


		/**
		 *	Callback to run when lazy loading image is complete.
		 */
		var lazyLoadCallback = function() {
			/**
			 *	Remove the loading icon
			 */
			$('i', thumbnail).remove();

			/**
			 *	Then set the background image
			 */
			$(thumbnail).css({
				'background-image': 'url("' + src + '")'
			}).removeAttr('data-src').addClass('loaded');
		};

		/**
		 *	Lazy load the background image, resetting
		 *	the styles on callback after the image has been
		 *	loaded
		 */
		Helpers.lazyLoadImage(thumbnail, {callback: lazyLoadCallback, height: 160});

	});

};

/**
*	Template - cards_mobile_project
*	Callback called automatically when the template instance is created.
*	@method destroyed
*	@return undefined
*/
Template['cards_mobile_project'].destroyed = function() {
};

/**
 *	Template - cards_mobile_project
 *	Helper functions for this template
 */
Template['cards_mobile_project'].helpers({

	/**
	 *	Returns the correct image path for use in the template, in this case the path for the thumbnail
	 */
	thumbnail: function() {

		var thumbnail = _.find(this.contents, function(item) {
			return item.type === 'thumbnail';
		});
		
		if(typeof thumbnail !== 'undefined' && typeof thumbnail.img !== 'undefined') {
			return 'images/projects/' + Helpers.loadImageSource(thumbnail.img, {isThumbnail: true});
		}
		else {
			return false;
		}
	},

	/**
	 *	Function to populate translated slug to be used in
	 *	the iron-router pathFor function
	 */
	translatedSlug: function() {
		var data = Template.currentData(),
			slug = data.slug;

		return UI._globalHelpers.loadMessageCode(slug);
	}

});