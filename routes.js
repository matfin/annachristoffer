Router.onBeforeAction(function() {
	$('nav, section').removeClass('revealed');
	App.currentView.type = false;
	App.currentView.id = false;
	this.next();
});

Router.configure({
	loadingTemplate: 'components_loading'
});

Router.map(function() {

	/**
	 *	Generic content pages
	 */
	this.route('content', {
		path: '/content/:_page_slug?',
		trackPageView: true,
		template: 'template_main',
		yieldTemplates: {
			'header': {to: 'header'},
			'page': {to: 'content'},
			'footer': {to: 'footer'}
		}
	}, {where: 'client'});


	/**
	 *	The landing view listing projects with an optional category slug
	 */
	this.route('list', {
		path: '/:_category_slug?',
		trackPageView: true,
		template: 'template_main',
		notFoundTemplate: 'template_notfound',
		yieldTemplates: {
			'header': {to: 'header'},
			'list': {to: 'content'},
			'footer': {to: 'footer'}
		}
	}, {where: 'client'});

	/**
	 *	Project detail view
	 */
	this.route('detail', {
		path: '/project/:_project_slug',
		trackPageView: true,
		template: 'template_main',
		notFoundTemplate: 'template_notfound',
		yieldTemplates: {
			'header': {to: 'header'},
			'views_detail': {to: 'content'},
			'footer': {to: 'footer'}
		}
	}, {where: 'client'});
});