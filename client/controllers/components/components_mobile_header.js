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
	if(App.currentView.type === 'project' || App.currentView.type === 'page') {
		this.$('#back').addClass('show');
	}
	else {
		this.$('#back').removeClass();
	}

	/**
	 *	Notify the webview that the header template has loaded
	 */
	var message = {
		templateRendered: 'components_mobile_header'
	};
};

/**
*	Template - components_mobile_header
*	Callback called automatically when the template instance is destroyed.
*	@method destroyed
*	@return undefined
*/
Template['components_mobile_header'].destroyed = function() {
};

/**
 *	Template - components_mobile_header
 *	Helper functions for this template
 */
Template['components_mobile_header'].helpers({

	/**
	 *	Populate navigation items from the categories collection
	 */
	navCategories: function() {
		return App.models.categories.find({}).fetch();
	},

	/**
	 *	Populate page content items from the content collection.
	 */
	staticContent: function() {
		var content = {
			mainHeading: App.models.staticContent.findOne({slug: 'title'}),
			subtitle: App.models.staticContent.findOne({slug: 'subtitle'}),
			projects: App.models.staticContent.findOne({slug: 'projects'}),
			nativeapp: App.models.staticContent.findOne({slug: 'nativeapp'})
		};
		return content;
	},

	/**
	 *	Populate pages from the pages collection.
	 */
	pages: function() {
		return App.models.pages.find({}).fetch();
	},

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
 *	Hide the nav when the user scrolls on the screen
 */
var hideOnScroll = Tracker.autorun(function() {
	/**
	 *	Viewport scroll dependency should close the header,
	 *	make this a dependent function.
	 */
	Dependencies.viewportScrollDependency.depend();

	$('nav', 'header').removeClass('revealed');
});

/**
 *	Template - components_mobile_header
 *	events
 */
Template['components_mobile_header'].events = {
	'touchstart #menu_reveal': function(e, template) {
		template.$('nav').toggleClass('revealed');
	},
	'touchstart .switch-language':  function(e, template) {
		Helpers.switchLanguage($(e.currentTarget).data('language'));
	},
	'touchstart #back': function(e, template) {
		if(App.currentView.type === 'project' || App.currentView.type === 'page') {
			Router.go('list');
		}
		e.preventDefault();
		return false;
	}
};