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
seoPicker.route('/', function(params, request, result) {

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
			pageContent: pageContent
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