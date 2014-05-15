Router.onRun(function() {
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
		path: '/content/:_content_slug?',
		template: 'template_main',
		data: function() {
			_content_slug = this.params._content_slug;
			console.log('Content', _content_slug);
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