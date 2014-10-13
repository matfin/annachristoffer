/**
*	Template - components_mobile_header
*	Callback called automatically when the template instance is created.
*	@method created
*	@return undefined
*/
Template['components_mobile_header'].created = function() {
};

/**
*	Template - components_mobile_header
*	Callback called automatically when the template instance is rendered.
*	@method rendered
*	@return undefined
*/
Template['components_mobile_header'].rendered = function() {
};

/**
*	Template - components_mobile_header
*	Callback called automatically when the template instance is destroyed.
*	@method destroyed
*	@return undefined
*/
Template['components_mobile_header'].destroyed = function() {
	console.log('components_mobile_header destroyed');
};

/**
*	Template - components_mobile_header
*	Populate navigation items from the categories collection
*	@method navCategories
*	@return {Object} - fetched categories result set
*/
Template['components_mobile_header'].navCategories = function() {
	return App.models.categories.find({}).fetch();
};

/**
*	Template - components_header
*	Populate page content items from the content collection.
*	@method pages
*	@return {Object}
*/
Template['components_mobile_header'].staticContent = function() {
	var content = {
		mainHeading: App.models.staticContent.findOne({slug: 'title'}),
		subtitle: App.models.staticContent.findOne({slug: 'subtitle'}),
		projects: App.models.staticContent.findOne({slug: 'projects'})
	};
	return content;
};

/**
*	Template - components_header
*	Populate pages from the pages collection.
*	@method pages
*	@return {Object} - fetched categories result set
*/
Template['components_mobile_header'].pages = function() {
	return App.models.pages.find({}).fetch();
};

/**
 *	Template - components_mobile_header
 *	Helper functions for this template
 */
Template['components_mobile_header'].helpers({

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

/**
 *	Template - components_mobile_header
 *	events
 */
Template['components_mobile_header'].events = {
	'touchstart #header_reveal, click #header_reveal': function(e, template) {

		var headerButtons = template.$('.header_buttons'),
			header = template.$('header');

		if(header.hasClass('revealed')) {
			headerButtons.removeClass('revealed');
			header.removeClass('revealed');
		}
		else {
			header.addClass('revealed');
			headerButtons.addClass('revealed');
		}
	},
	'click a':  function(e, template) {
		var headerButtons = template.$('.header_buttons'),
			header = template.$('header');
		
		headerButtons.removeClass('revealed');
		header.removeClass('revealed');
	}
};