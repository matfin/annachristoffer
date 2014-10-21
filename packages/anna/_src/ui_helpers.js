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

	Dependencies.languageChangedDependency.depend();

	console.log(message, typeof message, ' test');

	if(typeof message === 'undefined') {
		return 'Content not found. This is undefined';
	}
	else if(typeof message === 'string') {
		return message;
	}
	else if(typeof message[App.language] !== 'undefined') {
		return message[App.language];
	}
	else {
		console.log('Content not found for: ', message);
		return 'Content not found';
	}
});

/**
 *	Helper function to determine if a given category id is the current one
 *
 *	@function isCurrentCategory
 *	@param {Number}	category_id - the given category ID
 *	@return {Boolean} - true if there is a match or false 
 */
UI.registerHelper('isCurrentCategory', function(category_id) {
	return App.currentCategoryId && App.currentCategoryId === category_id;
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
	var m = moment(dateString);
	return m.isValid() ? m.format(dateFormat):dateString; 
});

/**
 *	Method to return device specific parameters for use directly inside templates.
 *
 *	@return {Object} Device - listing the properties of the current device
 */
UI.registerHelper('deviceParameters', function() {

	/**
	 *	This depends on the viewport resize dependency being changed.
	 */
	Dependencies.viewportResizeDependency.depend();

	return Device;

});