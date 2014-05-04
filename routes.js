Router.map(function() {

	// Project list view (all projects)
	this.route('home', {
		path: '/',
		template: 'template_main',
		yieldTemplates: {
			'components_header': {to: 'header'},
			'views_list': {to: 'content'},
			'components_footer': {to: 'footer'}
		}
	});

	// General content views
	this.route('about', {
		path: '/about',
		template: 'template_main',
		yieldTemplates: {
			'components_header': {to: 'header'},
			'views_content': {to: 'content'},
			'components_footer': {to: 'footer'}
		}
	});

});