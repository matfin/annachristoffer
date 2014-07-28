/**
*	Template - views_page
*	Callback called automatically when the template instance is created.
*	@method created
*	@return undefined
*/
Template['views_page'].created = function() {
	App.currentView = 'page';
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

/**
 *	Template - item_dateNode
 *	Helper to return a nicely formatted date using moment.js
 *	@method formattedDate
 *	@param {String}	The date string, which should be in the format "YYYY-MM-DD" ie: "2013-04-26".
 *	@param {String} The formatting for the date to be displayed.
 *	@return {String} the formatted date
 */
Template['item_dateNode'].formattedDate = function(dateString, dateFormat) {
	var m = moment(dateString);
	return m.isValid() ? m.format(dateFormat):dateString; 
};

/**
 *	Template - item_dateNode
 *	Helper function to determine if the date exists
 *	@method exists
 *	@param {Object} the date object
 *	@return {Boolean} true if the date object is not null, undefined or empty
 */
Template['item_dateNode'].exists = function(date) {
	return typeof date !== 'undefined' && date.length > 0;
}