/**
 *	Template - home
 *	Server side controller for the home template which 
 *	gives a list of all the projects.
 */
SSR.compileTemplate('home', Assets.getText('views/home.html'));

/**
 *	Template - home
 *	Helpers
 */
Template.home.helpers({
	
	/**
	 *	@method currentLanguage
	 *	@return {String} - grab the current Server language variable
	 */
	currentLanguage: function() {
		return Helpers.currentLanguage();
	},
	
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
	 *	@method baseMediaUrl
	 *	@return {String} - the base media url from the Server component
	 */
	baseMediaUrl: function() {
		return Server.mediaUrl;
	},

	/**
	 *	@method thumbnailUrl
	 *	@return {String} - the thumbnail url from the content
	 */
	thumbnail: function() {

		var thumbnail = _.find(this.contents, function(item) {
			return item.type === 'thumbnail';
		});
		
		if(typeof thumbnail !== 'undefined' && typeof thumbnail.img !== 'undefined') {
			return 'images/projects/' + thumbnail.img + '.jpg';
		}
		else {
			return false;
		}
	}
});