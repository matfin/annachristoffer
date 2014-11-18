Router.onRun(function() {
	this.next();
});

Router.onBeforeAction(function() {
	$('nav, section').removeClass('revealed');
	App.currentView.type = false;
	App.currentView.id = false;

	/**
	 *	Subscribe to simple content published from the server
	 */
	Meteor.subscribe('categories');
	Meteor.subscribe('staticContent');
	Meteor.subscribe('pages');
	this.next();
});

Router.map(function() {

	/** 
	 *	General content views with optional content loaded
	 *	if the _content parameter is specified, otherwise 
	 *	load the main list page of unfiltered projects.
	 */
	this.route('content', {
		path: '/content/:_page_slug?',
		waitOn: function() {
			return Meteor.subscribe('pages', this.params._page_slug, App.language);
		},
		action: function() {

			if(this.ready()) { 
				this.render();
			}
			else {
				this.next();
			}
		},
		data: function() {
			if(!this.ready()) {
				return;
			}

			var page = App.models.pages.findOne({}),
				alternateLanguages = _.filter(App.languages, function(language) {
					return language !== App.language;
				});

			/**
			 *	If we cannot find the page based on the current slug, then run another
			 *	query to fetch the page in a different language. 
			 *
			 *	This fixes a bug that arises when the user changes the language and 
			 *	refreshes the page. We check the slugs of the page in different languages
			 *	and load it.
			 */
			if(typeof page === 'undefined') {
				_.each(alternateLanguages, function(language) {
					var query = {};
					query['slug.' + language] = this.params._page_slug; 
					return page = App.models.pages.findOne(query) !== 'undefined';
				}.bind(this));
			}
			
			App.currentView.type = 'page';
			App.currentView.id = page.id;
			return page;
		},
		template: 'template_main',
		notFoundTemplate: 'template_notfound',
		yieldTemplates: {
			'header': {to: 'header'},
			'views_page': {to: 'content'},
			'footer': {to: 'footer'}
		}
	});

	/** 
	 *	Project list view (all projects) with optional 
	 *	filter parameter for showing projects only by 
	 *	their category name.
	 */ 
	this.route('list', {
		path: '/:_category_slug?',
		template: 'template_main',
		action: function() {
			if(this.ready()) {
				this.render();
			}
			else {
				this.next();
			}
		},
		waitOn: function() {
			return [
				Meteor.subscribe('projects'), 
				Meteor.subscribe('formations'),
				Meteor.subscribe('categories')
			];
		},
		data: function() {

			if(!this.ready()) {
				return;
			}

			if(this.params._category_slug) {
				/**
				 * Building up the query given the category slug and the language
				 */
				var query = {},
					alternateLanguages = _.filter(App.languages, function(language) {
						return language !== App.language;
					});

				query['slug.' + App.language] = this.params._category_slug;
				
				/**
				 *	Grab the category given the query
				 */
				var category = App.models.categories.findOne(query);

				/**
				 *	If we cannot find the category based on the current slug, then run another
				 *	query to fetch the category in a different language. 
				 *
				 *	This fixes a bug that arises when the user changes the language and 
				 *	refreshes the page. We check the slugs of the page in different languages
				 *	and load it.
				 */
				if(typeof category === 'undefined') {
					_.each(alternateLanguages, function(language) {
						var query = {};
						query['slug.' + language] = this.params._category_slug; 
						category = App.models.categories.findOne(query);
						if(typeof category !== 'undefined') return category;
					}.bind(this));
				}

				/**
				 *	Set the App level currentCategoryId
				 */
				App.currentView.type = 'list';
				App.currentView.id = category.id;

				return {
					projects: App.models.projects.find({}, {sort: {id: 1}}).fetch(),
					category_id: category.id
				}

			}
			else {
				/**
				 *	Clear the App level currentCategoryId
				 */ 
				App.currentView.type = 'list';
				
				return {
					projects: App.models.projects.find({}, {sort: {id: 1}}).fetch()
				}
			}
		},
		notFoundTemplate: 'template_notfound',
		yieldTemplates: {
			'header': {to: 'header'},
			'list': {to: 'content'},
			'footer': {to: 'footer'}
		}
	});

	/** 
	 *	Project detail view loaded from project 
	 *	slug name.
	 */ 
	this.route('detail', {
		path: '/project/:_project_slug',
		template: 'template_main',
		action: function() {
			if(this.ready()) {
				this.render();
			}
			else {
				this.next();
			}
		},
		waitOn: function() {
			return Meteor.subscribe('projects', this.params._project_slug, App.language)
		},
		data: function() {
			if(!this.ready()) {
				return;
			}
			return App.models.projects.findOne({});
		},
		notFoundTemplate: 'template_notfound',
		yieldTemplates: {
			'header': {to: 'header'},
			'views_detail': {to: 'content'},
			'footer': {to: 'footer'}
		}
	});
});