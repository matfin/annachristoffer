/**
*	Template - components_footer
*	Callback called automatically when the template instance is created.
*	@method created
*	@return undefined
*/
Template['components_footer'].created = function() {
};

/**
*	Template - components_footer
*	Callback called automatically when the template instance is rendered.
*	@method rendered
*	@return undefined
*/
Template['components_footer'].rendered = function() {
};

/**
*	Template - components_footer
*	Callback called automatically when the template instance is destroyed.
*	@method destroyed
*	@return undefined
*/
Template['components_footer'].destroyed = function() {
		
};

/**
*	Template - components_mobile_footer
*	Callback called automatically when the template instance is created.
*	@method created
*	@return undefined
*/
Template['components_mobile_footer'].created = function() {
};

/**
*	Template - components_mobile_footer
*	Callback called automatically when the template instance is rendered.
*	@method rendered
*	@return undefined
*/
Template['components_mobile_footer'].rendered = function() {
};

/**
*	Template - components_mobile_footer
*	Callback called automatically when the template instance is destroyed.
*	@method destroyed
*	@return undefined
*/
Template['components_mobile_footer'].destroyed = function() {
		
};

/**
*	Template - components_mobile_footer
*	Populate pages from the pages collection.
*	@method pages
*	@return {Object} - fetched categories result set
*/
Template['components_mobile_footer'].pages = function() {
	return App.models.pages.find({}).fetch();
};

/**
*	Template - components_mobile_footer
*	Populate page content items from the content collection.
*	@method pages
*	@return {Object}
*/
Template['components_mobile_footer'].staticContent = function() {
	var content = {
		projects: App.models.staticContent.findOne({slug: 'projects'})
	};
	return content;
};

/**
 *	Template - components_mobile_footer
 *	Helper functions for this template
 */
Template['components_mobile_footer'].helpers({

	/**
	 *	Function to populate translated slug to be used in
	 *	the iron-router pathFor function
	 */
	translatedSlug: function() {
		var data = Template.currentData(),
			slug = data.slug;

		return UI._globalHelpers.loadMessageCode(slug);
	}

});