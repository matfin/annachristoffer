Router.onRun(function() {
});

Router.onBeforeAction(function() {
	$('nav, section').removeClass('revealed');

	/**
	 *	Subscribe to simple content published from the server
	 */
	Meteor.subscribe('categories');
	Meteor.subscribe('staticContent');
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
		data: function() {
			return App.models.pages.findOne({});
		},
		template: 'template_main',
		yieldTemplates: {
			'components_header': {to: 'header'},
			'views_page': {to: 'content'},
			'components_footer': {to: 'footer'}
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
		data: function() {
			return {
				_category_slug: this.params._category_slug
			};
		},
		yieldTemplates: {
			'components_header': {to: 'header'},
			'views_list': {to: 'content'},
			'components_footer': {to: 'footer'}
		}
	});

	/** 
	 *	Project detail view loaded from project 
	 *	slug name.
	 */ 
	this.route('detail', {
		path: '/project/:_project_slug',
		template: 'template_main',
		data: function() {
			return {
				_project_slug: this.params._project_slug
			}
		},
		notFoundTemplate: 'template_notfound',
		yieldTemplates: {
			'components_header': {to: 'header'},
			'views_detail': {to: 'content'},
			'components_footer': {to: 'footer'}
		}
	});
});