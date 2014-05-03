Router.map(function() {

	// Landing page
	this.route('home', {
		path: '/',
		template: 'template_main',
		yieldTemplates: {
			'components_header': {to: 'header'},
			'views_home': {to: 'content'},
			'components_footer': {to: 'footer'}
		}
	});

	// About
	this.route('about', {
		path: '/about',
		template: 'template_main',
		yieldTemplates: {
			'components_header': {to: 'header'},
			'views_about': {to: 'content'},
			'components_footer': {to: 'footer'}
		}
	});

	// Contact
	this.route('contact', {
		path: '/contact',
		template: 'template_main',
		yieldTemplates: {
			'components_header': {to: 'header'},
			'views_contact': {to: 'content'},
			'components_footer': {to: 'footer'}
		}
	});

	// Books
	this.route('books', {
		path: '/books',
		template: 'template_main',
		yieldTemplates: {
			'components_header': {to: 'header'},
			'views_books': {to: 'content'},
			'components_footer': {to: 'footer'}
		}
	});

	// Icons
	this.route('icons', {
		path: '/icons',
		template: 'template_main',
		yieldTemplates: {
			'components_header': {to: 'header'},
			'views_icons': {to: 'content'},
			'components_footer': {to: 'footer'}
		}
	});

	// Illustrations
	this.route('illustrations', {
		path: '/illustrations',
		template: 'template_main',
		yieldTemplates: {
			'components_header': {to: 'header'},
			'views_illustrations': {to: 'content'},
			'components_footer': {to: 'footer'}
		}
	});

	// Interactions
	this.route('interactions', {
		path: '/interactions',
		template: 'template_main',
		yieldTemplates: {
			'components_header': {to: 'header'},
			'views_interactions': {to: 'content'},
			'components_footer': {to: 'footer'}
		}
	});

	// Posters
	this.route('posters', {
		path: '/posters',
		template: 'template_main',
		yieldTemplates: {
			'components_header': {to: 'header'},
			'views_posters': {to: 'content'},
			'components_footer': {to: 'footer'}
		}
	});

	// Books
	this.route('projects', {
		path: '/projects',
		template: 'template_main',
		yieldTemplates: {
			'components_header': {to: 'header'},
			'views_projects': {to: 'content'},
			'components_footer': {to: 'footer'}
		}
	});

	// Studies
	this.route('studies', {
		path: '/studies',
		template: 'template_main',
		yieldTemplates: {
			'components_header': {to: 'header'},
			'views_studies': {to: 'content'},
			'components_footer': {to: 'footer'}
		}
	});

	// Work experience
	this.route('work-experience', {
		path: '/work-experience',
		template: 'template_main',
		yieldTemplates: {
			'components_header': {to: 'header'},
			'views_work_experience': {to: 'content'},
			'components_footer': {to: 'footer'}
		}
	});

});