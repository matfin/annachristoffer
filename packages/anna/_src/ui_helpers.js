/**
 *	Collection of UI specific helpers used by the templates in this app.
 */

/**
 *	Method to load content by given language
 *
 *	@param {Object} message - the message object containing the mesages in different langyages
 *	@return {String} - The string message fetched by index from the message object
 */
UI.registerHelper('loadMessageCode', function(message) {
	if(typeof message === 'string') {
		return message;
	}
	else if(typeof message[App.language] === 'string') {
		return message[App.language];
	}
	else {
		return 'Content not found';
	}
});