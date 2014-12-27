/**
 *	Template - meta
 *	Server side controller for loading SEO meta tags
 */
SSR.compileTemplate('meta', Assets.getText('meta.html'));

/**
 *	Template - header
 *	Helpers
 */
Template.meta.helpers({
	/**
	 *	@method loadMessageCode
	 *	@param 	{Object} message - the message object containing string messages by language
	 *	@return {String} - the message as indexed by the language
	 */
	loadMessageCode: function(message) {
		return Helpers.loadMessageCode(message);
	},

	/**
	 *	Function to load the correct SEO content for each page in the site
	 */ 
	seoContent: function() {

		/**
		 *	Loading the basic SEO data
		 */
		var seoData = Server.dataSources.meta.collection.findOne({page: this.seopage});

		/**
		 *	Altering SEO data if we are on a project page.
		 */
		if(this.seopage === 'project') {
			return {
				title: Helpers.loadMessageCode(seoData.title) + ' - ' + Helpers.loadMessageCode(this.project.title),
				url: 'http://annachristoffer.com/' + Helpers.loadMessageCode(this.project.slug),
				description: Helpers.loadMessageCode(this.project.description),
				site_name: seoData.site_name,
				type: seoData.type,
				image: this.project.og_img
			}
		}
		/**
		 *	Likewise, if we are on the about page.
		 */
		else if(this.seopage === 'about') {
			return {
				title: Helpers.loadMessageCode(seoData.title),
				url: 'http://annachristoffer.com/about',
				description: Helpers.loadMessageCode(seoData.description),
				site_name: seoData.site_name,
				type: seoData.type,
				image: seoData.image
			}
		}
		/**
		 *	Or we return the default SEO data
		 */
		return {
			title: Helpers.loadMessageCode(seoData.title),
			url: 'http://annachristoffer.com/',
			description: Helpers.loadMessageCode(seoData.description),
			site_name: seoData.site_name,
			type: seoData.type,
			image: seoData.image
		}
	}
	
});

