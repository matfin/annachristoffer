/**
 *	Template - header
 *	Server side controller for the header template
 */
SSR.compileTemplate('header', Assets.getText('views/header.html'));

/**
 *	Template - header
 *	Helpers
 */
Template.header.helpers({

	/**
	 *	@method loadMessageCode
	 *	@param 	{Object} message - the message object containing string messages by language
	 *	@return {String} - the message as indexed by the language
	 */
	loadMessageCode: function(message) {
		return Helpers.loadMessageCode(message);
	},

	/**
	 *	Populate page content items from the content collection.
	 */
	staticContent: function() {
		return {
			title: Server.dataSources.staticContent.collection.findOne({slug: 'title'}),
			subtitle: Server.dataSources.staticContent.collection.findOne({slug: 'subtitle'}),
			projects: Server.dataSources.staticContent.collection.findOne({slug: 'projects'})
		};
	}
	
});