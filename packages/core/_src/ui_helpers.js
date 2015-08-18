/**
 *	Collection of UI specific helpers used by the templates in this app.
 */

/**
 *	Method to load content by given language
 *
 *	@param {Object} message - the message object containing the mesages in different languages
 *	@return {String} - The string message fetched by index from the message object
 */
UI.registerHelper('loadMessageCode', function(message) {
	return Helpers.loadMessageCode(message);
});

/**
 *	Helper function to determine if a given category id is the current one
 *
 *	@function isCurrentCategory
 *	@param {Number}	category_id - the given category ID
 *	@return {Boolean} - true if there is a match or false 
 */
UI.registerHelper('isCurrentCategory', function(category_id) {
	return App.currentView.type === 'list' && App.currentView.id === category_id;
});

/**
 *	Helper function to determine if a given page id is the current one
 *
 *	@function isCurrentPage
 *	@param {Number} page_id - the given page ID
 *	@return {Boolean} - true if there is a page match or false
 */
UI.registerHelper('isCurrentPage', function(page_id) {
	return App.currentView.type === 'page' && App.currentView.id === page_id;
});

/**
 *	Helper function to determine if on the landing page
 *
 *	@function isLandingPage
 *	@return {Boolean} - true if on the landing page or false
 */
UI.registerHelper('isLandingPage', function() {
	return App.currentView.type === 'list' && App.currentView.id === false;
});

/**
 *	Helper to return a nicely formatted date using moment.js
 *	
 *	@method formattedDate
 *	@param {String}	The date string, which should be in the format "YYYY-MM-DD" ie: "2013-04-26".
 *	@param {String} The formatting for the date to be displayed.
 *	@return {String} The formatted date
 */
UI.registerHelper('formattedDate', function(dateString, dateFormat) {
	return Helpers.formattedDate(dateString, dateFormat);
});

/**
 *	Method to return device specific parameters for use directly inside templates.
 *
 *	@method deviceParameters
 *	@return {Object} Device - listing the properties of the current device
 */
UI.registerHelper('deviceParameters', function() {

	/**
	 *	This depends on the viewport resize dependency being changed.
	 */
	Dependencies.viewportResizeDependency.depend();

	return Device;

});

/**
 *	Method to return the base url for accessing media assets
 *
 *	@method mediaUrl
 *	@return {String} the base url for accessing media ie: http://media.annachristoffer.com/
 */
UI.registerHelper('mediaUrl', function() {
	return App.mediaUrl;
});