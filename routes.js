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

Router.configure({
	loadingTemplate: 'components_loading'
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
			return [
				Meteor.subscribe('pages', this.params._page_slug, App.language),
				Meteor.subscribe('staticContent')
			];
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
		onAfterAction: function() {

			if(!this.ready()) {
				return;
			}

			/**
			 *	Populating meta tags for SEO. In this case, we will use content from 
			 *	the static content collection.
			 */
			var data = this.data();
				titleObject = App.models.staticContent.findOne({slug: 'title'});

			/**
			 *	Populate SEO tags using the ms-seo module only when the data has fully loaded
			 */
			if(typeof data !== 'undefined' && typeof titleObject !== 'undefined') {

				SEO.set({
					title: Helpers.loadMessageCode(data.title) + ' - ' + Helpers.loadMessageCode(titleObject.content),
					meta: {
						'description': Helpers.loadMessageCode(data.title)
					},
					og: {
						'type': 'website'
					}
				});
			}
		},
		template: 'template_main',
		notFoundTemplate: 'template_notfound',
		yieldTemplates: {
			'header': {to: 'header'},
			'page': {to: 'content'},
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
				Meteor.subscribe('categories'),
				Meteor.subscribe('staticContent')
			];
		},
		data: function() {

			if(!this.ready()) {
				return;
			}

			var data = {
				projects: App.models.projects.find({}, {sort: {id: 1}}).fetch()
			};
						
			App.currentView.type = 'list';

			if(this.params._category_slug) {
				/**
				 * Building up the query given the category slug and the language
				 */
				var query = {},
					category,
					alternateLanguages = _.filter(App.languages, function(language) {
						return language !== App.language;
					});

				query['slug.' + App.language] = this.params._category_slug;
				
				/**
				 *	Grab the category given the query
				 */
				category = App.models.categories.findOne(query);

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
				App.currentView.id = category.id;
				data.category_id = category.id;
				data.category = category;
			}
			else {
				/**
				 *	Clear the App level currentCategoryId
				 */ 
				App.currentView.id = false;
			}

			return data;
		},
		onAfterAction: function() {
			
			if(!this.ready()) {
				return;
			}

			/**
			 *	Populating meta tags for SEO. In this case, we will use content from 
			 *	the static content collection.
			 */
			var data = this.data();
				titleObject = App.models.staticContent.findOne({slug: 'title'}),
				subtitleObject = App.models.staticContent.findOne({slug: 'subtitle'}),
				categoryDescription = '';

			/**
			 *	Populate SEO tags using the ms-seo module only when the data has fully loaded
			 */
			if(typeof titleObject !== 'undefined' && typeof subtitleObject !== 'undefined') {

				if(typeof data.category !== 'undefined') {
					categoryDescription = Helpers.loadMessageCode(data.category.description) + ' - ';
				}

				SEO.set({
					title: categoryDescription + Helpers.loadMessageCode(titleObject.content),
					meta: {
						'description': categoryDescription + Helpers.loadMessageCode(subtitleObject.content)
					},
					og: {
						'type': 'website'
					}
				});
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
			return [
				Meteor.subscribe('projects'), 
				Meteor.subscribe('staticContent')
			];
		},
		data: function() {
			if(!this.ready()) {
				return;
			}

			/**
			 *	Given a query built from the slug and language, 
			 *	return the project
			 */
			var query = {};
			query['slug.' + App.language] = this.params._project_slug; 
			return App.models.projects.findOne(query);
		},
		onAfterAction: function() {
			if(!this.ready()) {	
				return;
			}

			/**
			 *	Populating meta tags for SEO. In this case, we will use content from 
			 *	the static content collection.
			 */
			var data = this.data(),
				titleObject = App.models.staticContent.findOne({slug: 'title'});

			/**
			 *	Checking project data has loaded before attempting to access its properties
			 */
			if(typeof titleObject !== 'undefined' && typeof data !== 'undefined') {

				SEO.set({
					title: Helpers.loadMessageCode(data.title) + ' - ' + Helpers.loadMessageCode(titleObject.content),
					meta: {
						'description': Helpers.loadMessageCode(data.description)
					},
					og: {
						'type': 'article'
					}
				});
			}

			App.currentView.type = 'project';

		},
		notFoundTemplate: 'template_notfound',
		yieldTemplates: {
			'header': {to: 'header'},
			'views_detail': {to: 'content'},
			'footer': {to: 'footer'}
		}
	});
});