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
	if(typeof message === 'undefined') {
		return 'Content not found';
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