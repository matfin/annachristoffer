/**
*	Template - views_page
*	Callback called automatically when the template instance is created.
*	@method created
*	@return undefined
*/
Template['views_page'].created = function() {
	App.currentView = 'content';
};

/**
*	Template - views_page
*	Callback called automatically when the template instance is created.
*	@method rendered
*	@return undefined
*/
Template['views_page'].rendered = function() {
	$('body').addClass('page');
};

/**
*	Template - views_page
*	Callback called automatically when the template instance is created.
*	@method destroyed
*	@return undefined
*/
Template['views_page'].destroyed = function() {
	$('body').removeClass();
};

/**
 *	Template - views_page
 *	Helper function to return the page data
 *	@method pageData
 *	@return {Object} - the page data 
 */
Template['views_page'].pageData = function() {
	return App.models.pages.findOne({'slug': this._page_slug});
};

/**
 *	Template - views_item
 *	Helper function to return the correct template to load based on the content type
 *	@method dynamicTemplate
 *	@return {Object} the template needed to render the content
 */
Template['views_item'].dynamicTemplate = function() {
	switch(this.type) {
		case 'date': 
			return Template['item_dateNode'];
		case 'list':
			return Template['item_listNode'];
		default: 
			return Template['item_textNode'];
	}
};

/**
 *	Template - item_textNode
 *	Helper function to determine the tag of the current data item
 *	@method isTag
 *	@param {String} tagName
 *	@return {Boolean} true if the tag matches
 */
Template['item_textNode'].isTag = function(tagName) {
	return tagName === this.type;
};