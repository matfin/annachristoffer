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
seoPicker.route('/:_lang/:_category_slug?', function(params, request, result) {

	/**
	 *	Set the current language attribute for the server
	 */
	Server.language = params._lang;

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
seoPicker.route('/:_lang/project/:_slug', function(params, request, result) {

	/**
	 *	Set the current language attribute for the server
	 */
	Server.language = params._lang;

	/**
	 *	Checking user agent strings
	 */
	console.log('UA: ' + request.headers['user-agent']);

	
	var query = {},
		project;
	query['slug.' + Server.language] = params._slug;
	project = Server.dataSources.projects.collection.findOne(query);


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
seoPicker.route('/:_lang/content/:_page', function(params, request, result) {

	/**
	 *	Set the current language attribute for the server
	 */
	Server.language = params._lang;

	/**
	 *	Checking user agent strings
	 */
	console.log('UA: ' + request.headers['user-agent']);


	
	var query = {},
		page;
	query['slug.' + Server.language] = params._page;

	page = Server.dataSources.pages.collection.findOne(query);

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