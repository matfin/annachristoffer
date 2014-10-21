/**
*	Template - views_detail
*	Callback called automatically when the template instance is created.
*	@method created
*	@return undefined
*/
Template['views_detail'].created = function() {
	App.currentView = 'detail';
};

/**
*	Template - views_detail
*	Callback called automatically when the template instance is created.
*	@method rendered
*	@return undefined
*/
Template['views_detail'].rendered = function() {
	$('body').addClass('detail');
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
	 *	Helper function to determine if full slider template should be loaded	
	 */
	isFullSlider: function() {
		return this.type === 'fullslider';
	},

	/**
	 *	Helper function to determine if the video template should be loaded
	 */
	isVideo: function() {
		return this.type === 'video';
	}

});