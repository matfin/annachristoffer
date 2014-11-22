/**
*	Template - components_header
*	Callback called automatically when the template instance is created.
*	@method created
*	@return undefined
*/
Template['components_header'].created = function() {
};

/**
*	Template - components_header
*	Callback called automatically when the template instance is rendered.
*	@method rendered
*	@return undefined
*/
Template['components_header'].rendered = function() {
};

/**
*	Template - components_header
*	Callback called automatically when the template instance is destroyed.
*	@method destroyed
*	@return undefined
*/
Template['components_header'].destroyed = function() {
};

/**
 *	Template - components_header
 *	Helper functions for this template
 */
Template['components_header'].helpers({

	/** 
	 *	Populate navigation items from the categories collection
	 */
	navCategories: function() {
		return App.models.categories.find({}).fetch();
	},

	/**
	 *	Populate pages from the pages collection.
	 */
	pages: function() {
		return App.models.pages.find({}).fetch();
	},

	/**
	 *	Populate page content items from the content collection.
	 */
	staticContent: function() {
		var content = {
			mainHeading: App.models.staticContent.findOne({slug: 'title'}),
			subtitle: App.models.staticContent.findOne({slug: 'subtitle'}),
			projects: App.models.staticContent.findOne({slug: 'projects'})
		};
		return content;
	},

	/**
	 *	Function to populate translated slug to be used in
	 *	the iron-router pathFor function
	 */
	translatedSlug: function() {

		Dependencies.languageChangedDependency.depend();

		var data = Template.currentData(),
			slug = data.slug;

		return UI._globalHelpers.loadMessageCode(slug);
	}

});

/**
 *	Template - components_header 
 *	events
 */
Template['components_header'].events = {
	'click .language-select button': function(e, template) {
		Helpers.switchLanguage($(e.currentTarget).data('language'));
	}
};

/**
 *	Anonymous helper function to set the top position of the header menu on scroll
 *	@method positionHeader
 *	@return undefined
 */
var primeHeader = Tracker.autorun(function() {
	/**
	 *	Run this function each time the viewportScrolledDependency is changed.
	 *	Do not do this for mobile devices.
	 */
	Dependencies.viewportScrollDependency.depend();
	Dependencies.viewportResizeDependency.depend();

	/**
	 *	For now, the side nav menu should only scroll on a detail page
	 */
	if(App.currentView.type === 'project' || App.currentView.type === 'page') {
		
		var top = ($(window).scrollTop()) + 64;

		$('.header').css({
			'top': (top < 64 ? 64:top) + 'px'
		});

	}
});