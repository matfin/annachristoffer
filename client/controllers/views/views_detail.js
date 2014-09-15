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

	if(this.data && this.data.background && this.data.contents) {
		$('body').addClass(this.background);
	}

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
 *	Helper function to determine if figcapion template should be loaded
 *	@method isFigCaption
 *	@return {Boolean}
 */
Template['views_detail'].isFigCaption = function() {
	return this.type === 'figcaption';
};

/**
 *	Template - views_detail
 *	Helper function to determine if full slider template should be loaded
 *	@method isFullSlider
 *	@return {Boolean}
 */
Template['views_detail'].isFullSlider = function() {
	return this.type === 'fullslider';
};

/**
 *	Template - views_detail
 *	Helper function to determine if the video template should be loaded
 *	@method isVideo
 *	@return {Boolean}
 */
Template['views_detail'].isVideo = function() {
	return this.type === 'video';
};