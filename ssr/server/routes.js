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
	 *	Loading all projects
	 */
	var projects = Server.dataSources.projects.collection.find({}).fetch(),
		pages = Server.dataSources.pages.collection.find({}).fetch();

	/**
	 *	Creating the template
	 */
	var html = SSR.render('layout', {
		template: 'home',
		data: {
			seopage: 'overview',
			projects: projects,
			pages: pages,
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
	var projectResult,
		project;

	/**
	 *	Given a slug for a project, we try to find the project.
	 *	When the language is different and we cannot find the 
	 *	slug given the language, we attempt to search using other
	 *	languages. When we have found the project given the language,
	 *	we need to reset the server language to load the correct content.
	 */
	_.each(Server.languages, function(language) {
		var query = {};
		query['slug.' + language] = params._slug;
		if(typeof (projectResult = Server.dataSources.projects.collection.findOne(query)) !== 'undefined') {
			project = projectResult;
			Server.language = language;
		}
	});

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

	// var query = {};
	// query['slug.' + Server.language] = params._page;
	// var page = Server.dataSources.pages.collection.findOne(query);

	/**
	 *	Fetching the page data from the slug
	 */
	var pageResult,
		page;

	_.each(Server.languages, function(language) {
		var query = {};
		query['slug.' + language] = params._page;

		if(typeof (pageResult = Server.dataSources.pages.collection.findOne(query)) !== 'undefined') {
			page = pageResult;
			Server.language = language;
		}
	});

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