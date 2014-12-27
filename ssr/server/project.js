/**
 *	Template - project
 *	Server side controller for the project detail template
 */
SSR.compileTemplate('project', Assets.getText('project.html'));

/**
 *	Template - project
 *	Helpers
 */
Template.project.helpers({

	/**
	 *	Return project content relevant for SEO indexing. 
	 */
	contents: function() {
		/**
		 *	Filter all contents returning only images that have captions
		 */
		return _.filter(this.project.contents, function(item) {
			return typeof item.captions !== 'undefined';
		});
	},

	/**
	 *	@method baseMediaUrl
	 *	@return {String} - the base media url from the Server component
	 */
	baseMediaUrl: function() {
		return Server.mediaUrl;
	},

	/**
	 *	@method hasImage
	 *	@return {Boolean} - returns true if there is an image present
	 */
	hasImage: function(img) {
		return typeof img !== 'undefined';
	},

	/**
	 *	@method loadMessageCode
	 *	@param 	{Object} message - the message object containing string messages by language
	 *	@return {String} - the message as indexed by the language
	 */
	loadMessageCode: function(message) {
		return Helpers.loadMessageCode(message);
	}

});