var seoPicker = Picker.filter(function(request, result) {
	
	/**
	 *	These routes should only kick in when the site is crawled by 
	 *	various bots. 
	 *	In this case we want to check for the following:
	 *	- Google crawler bot 						(/_escaped_fragment_/)
	 *	- Facebook scraper for sharing content 		(/facebookexternalhit/)
	 *	- 
	 */
	return 		/_escaped_fragment_/.test(request.url) 						||				
				/facebookexternalhit/.test(request.headers['user-agent'])	||
				/Twitterbot/.test(request.headers['user-agent']);
});

/**
 *	Setting up the server side route for the landing page
 */
seoPicker.route('/:_category_slug?', function(params, request, result) {

	/**
	 *	Optional category slug
	 */
	var category_slug = params._category_slug;

	/**
	 *	Checking user agent strings
	 */
	console.log('UA: ' + request.headers['user-agent']);

	/**
	 *	Grabbing about page data
 	 */
 	var query = {};
	query['slug.' + Server.language] = 'about';
	var pageContent = Server.dataSources.pages.collection.findOne(query);

	/**
	 *	Loading all projects
	 */
	var projects = Server.dataSources.projects.collection.find({}).fetch();

	/**
	 *	Creating the template
	 */
	var html = SSR.render('layout', {
		template: 'home',
		data: {
			seopage: 'overview',
			projects: projects,
			pageContent: pageContent,
			categorySlug: category_slug
		}
	});

	/**
	 *	Returning the html
	 */
	result.end(html);
});

/**
 *	Setting up the server side route for the project details page
 */
seoPicker.route('/project/:_slug', function(params, request, result) {

	/**
	 *	Checking user agent strings
	 */
	console.log('UA: ' + request.headers['user-agent']);

	/**
	 *	Loading the details for the selected project.
	 */
	var query = {};
	query['slug.' + Server.language] = params._slug;
	var project = Server.dataSources.projects.collection.findOne(query);

	/**
	 *	Creating the template to render the html for the project
	 */
	var html = SSR.render('layout', {
		template: 'project',
		data: {
			seopage: 'project',
			project: project
		}
	});

	/**
	 *	Return the rendered html
	 */
	result.end(html);
});

/**
 *	Setting up the server side route for other pages
 */
seoPicker.route('/content/:_page', function(params, request, result) {

	/**
	 *	Checking user agent strings
	 */
	console.log('UA: ' + request.headers['user-agent']);

	var query = {};
	query['slug.' + Server.language] = params._page;
	var page = Server.dataSources.pages.collection.findOne(query);

	/**
	 *	Creating the template to render the html for the page
	 */
	var html = SSR.render('layout', {
		template: 'page',
		data: {
			seopage: 'about',
			page: page
		}
	});

	/**
	 *	Return the rendered html
	 */
	result.end(html);

});