Router.onRun(function() {
	this.next();
});

Router.onBeforeAction(function() {
	$('nav, section').removeClass('revealed');

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
			return App.models.pages.findOne({});
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
				var query = {};
				query['slug.' + App.language] = this.params._category_slug;
				
				/**
				 *	Grab the category given the query
				 */
				var category = App.models.categories.findOne(query);

				/**
				 *	Set the App level currentCategoryId
				 */
				App.currentCategoryId = category.id;

				return {
					projects: App.models.projects.find({}, {sort: {id: 1}}).fetch(),
					category_id: category.id
				}

			}
			else {
				/**
				 *	Clear the App level currentCategoryId
				 */ 
				App.currentCategoryId = false;
				
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