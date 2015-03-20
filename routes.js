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
	Meteor.subscribe('meta');
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
		path: ':_lang/content/:_page_slug?',
		trackPageView: true,
		template: 'template_main',
		onBeforeAction: function() {
			/**
			 *	Set the language given the url param
			 */
			App.language = this.params._lang;
			/**
			 *	Set the current view parameters
			 */
			App.currentView.type = 'page';
			this.next();
		},
		waitOn: function() {
			return [
				Meteor.subscribe('pages'),
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

			/**
			 *	Grab the page given the current language and page slug
			 */
			var query = {};
			query['slug.' + App.language] = this.params._page_slug;
			var page = App.models.pages.findOne(query);

			/**
			 *	Set the current view id to the page id being shown.
			 *	We need this later to reload the content when the 
			 *	user changes the language
			 */			
			App.currentView.id = page.id;
			return page;
		},
		notFoundTemplate: 'template_notfound',
		yieldTemplates: {
			'header': {to: 'header'},
			'page': {to: 'content'},
			'footer': {to: 'footer'}
		}
	});

	/**
	 *	If no language is set, default to 'de' and reroute
	 */
	this.route('default', {
		path: '/',
		trackPageView: false,
		action: function() {
			Router.go('/de');
		}
	});

	/** 
	 *	Project list view (all projects) with optional 
	 *	filter parameter for showing projects only by 
	 *	their category name.
	 */ 
	this.route('list', {
		path: '/:_lang/:_category_slug?',
		trackPageView: true,
		template: 'template_main',
		onBeforeAction: function() {
			/**
			 *	Set the language given the url param
			 */
			App.language = this.params._lang;
			App.currentView.type = 'list';
			this.next();
		},
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

			if(this.params._category_slug) {
				/**
				 * Building up the query given the category slug and the language
				 */
				var query = {},
					category;

				query['slug.' + App.language] = this.params._category_slug;
				
				/**
				 *	Grab the category given the query
				 */
				category = App.models.categories.findOne(query);

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
		path: ':_lang/project/:_project_slug',
		trackPageView: true,
		template: 'template_main',
		onBeforeAction: function() {
			/**
			 *	Set the language given the url param
			 */
			App.language = this.params._lang;
			App.currentView.type = 'project';
			this.next();
		},
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
			var query = {},
				project;
			query['slug.' + App.language] = this.params._project_slug; 
			project = App.models.projects.findOne(query);

			App.currentView.id = project.id;
			return project;
		},
		notFoundTemplate: 'template_notfound',
		yieldTemplates: {
			'header': {to: 'header'},
			'views_detail': {to: 'content'},
			'footer': {to: 'footer'}
		}
	});
});