/**
*	Template - views_detail
*	Callback called automatically when the template instance is created.
*	@method created
*	@return undefined
*/
Template['views_detail'].created = function() {
	App.currentView.type = 'project';
};

/**
*	Template - views_detail
*	Callback called automatically when the template instance is created.
*	@method rendered
*	@return undefined
*/
Template['views_detail'].rendered = function() {
	$('body').addClass('detail');

	/** 
	 *	Check on scroll for elements that are in the viewport,
	 *	then lazy load their contents 
	 */
	var checkAndLoadImages = Tracker.autorun(function() {

		/**
		 *	Make this dependent on viewport scroll being changed
		 *	so it autoruns on scroll.
		 */
		Dependencies.viewportScrollDependency.depend();

		var images = this.$('img', '.mobileMediaContainer');
		$.each(images, function(index, image) {
			Helpers.lazyLoadImage(image, function() {
				$(image).prev().remove();
			});
		}.bind(this));

	}.bind(this));

};

/**
*	Template - views_detail
*	Callback called automatically when the template instance is created.
*	@method destroyed
*	@return undefined
*/
Template['views_detail'].destroyed = function() {
	$('body').removeClass();
};

/**
 *	Template - views_detail
 *	Helper functions for this template
 */
Template['views_detail'].helpers({

	/**
	 *	Helper function to determine if figcapion template should be loaded
	 */
	isFigCaption: function() {
		return this.type === 'figcaption';
	},

	/**
	 *	Helper function to determine if the video template should be loaded
	 */
	isVideo: function() {
		return this.type === 'video';
	}

});