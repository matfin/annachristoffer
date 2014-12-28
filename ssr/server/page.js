/**
 *	Template - page
 *	Server side controller for the page template which 
 *	gives a list of all the projects.
 */
SSR.compileTemplate('page', Assets.getText('views/page.html'));

/**
 *	Template - page
 *	Helpers
 */
Template.page.helpers({
	
	/**
	 *	@method loadMessageCode
	 *	@param 	{Object} message - the message object containing string messages by language
	 *	@return {String} - the message as indexed by the language
	 */
	loadMessageCode: function(message) {
		return Helpers.loadMessageCode(message);
	},

	/**
	 *	@method formattedDate
	 *	@param 	{String} dateString - The date string, which should be in the format "YYYY-MM-DD" ie: "2013-04-26".
	 *	@param 	{String} dateFormat - The formatting for the date to be displayed.
	 *	@return {String} - The formatted date
	 */
	formattedDate: function(dateString, dateFormat) {
		return Helpers.formattedDate(dateString, dateFormat);
	},

	/**
	 *	Further helpers to load content into the correct tags
	 */
	isHeadingOne: function(tag) {
		return tag === 'h1';
	},
	isHeadingTwo: function(tag) {
		return tag === 'h2';
	},
	isHeadingThree: function(tag) {
		return tag === 'h3';
	},
	isParagraph: function(tag) {
		return tag === 'p';
	},
	isDate: function(tag) {
		return tag === 'date';
	}

});