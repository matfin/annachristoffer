Router.onRun(function() {
	/**
	 *	Populating content
	 */
	Api.fetch('content').then(function(data) {
		_.each(data.items, function(item){
			App.models.content.insert(item);
		})
	}).fail(function(error) {
		console.log(error);
	});

	/**
	 *	Populating projects
	 */
	Api.fetch('projects').then(function(data) {
		_.each(data.items, function(item){
			App.models.projects.insert(item);
		})
	}).fail(function(error) {
		console.log(error);
	});

	/**
	 *	Populating categories
	 */
	Api.fetch('categories').then(function(data) {
		_.each(data.items, function(item){
			App.models.categories.insert(item);
		})
	}).fail(function(error) {
		console.log(error);
	});
});

Router.onBeforeAction(function() {
});

Router.map(function() {

	/** 
	 *	General content views with optional content loaded
	 *	if the _content parameter is specified, otherwise 
	 *	load the main list page of unfiltered projects.
	 */
	this.route('content', {
		path: '/content/:_content?',
		template: 'template_main',
		data: function() {
			_content = this.params._content;
			console.log('Content', _content);
		},
		yieldTemplates: {
			'components_header': {to: 'header'},
			'views_content': {to: 'content'},
			'components_footer': {to: 'footer'}
		}
	});

	/** 
	 *	Project list view (all projects) with optional 
	 *	filter parameter for showing projects only by 
	 *	their category name.
	 */ 
	this.route('list', {
		path: '/:_category?',
		template: 'template_main',
		data: function() {
			_category = this.params._category;

			console.log('Filter', _category);
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
		path: '/project/:_category/:_project_slug',
		template: 'template_main',
		data: function() {
			_project_slug = this.params._project_slug;

			console.log('Project', _project_slug);
		},
		yieldTemplates: {
			'components_header': {to: 'header'},
			'views_detail': {to: 'content'},
			'components_footer': {to: 'footer'}
		}
	});

});