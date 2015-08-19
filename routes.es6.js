Router.configure({
	loadingTemplate: 'components_loading'
});

Router.map(function() {
	/**
	 *	Generic content pages
	 */
	this.route('content', {
		path: '/content/:_page_slug?',
		template: 'template_main',
		yieldTemplates: {
			'partials_header': {to: 'header'},
			'views_content': {to: 'content'}
		}
	}, {where: 'client'});

	/**
	 *	The landing view listing projects with an optional category slug
	 */
	this.route('list', {
		path: '/:_category_slug?',
		template: 'template_main',
		notFoundTemplate: 'template_notfound',
		yieldTemplates: {
			'partials_header': {to: 'header'},
			'views_list': {to: 'content'}
		}
	}, {where: 'client'});

	/**
	 *	Project detail view
	 */
	this.route('detail', {
		path: '/project/:_project_slug',
		template: 'template_main',
		notFoundTemplate: 'template_notfound',
		yieldTemplates: {
			'partials_header': {to: 'header'},
			'views_detail': {to: 'content'}
		}
	}, {where: 'client'});
});