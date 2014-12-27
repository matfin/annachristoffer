var seoPicker = Picker.filter(function(request, result) {
	return /_escaped_fragment_/.test(request.url);
});

/**
 *	Setting up the server side route for the landing page
 */
seoPicker.route('/', function(params, request, result) {

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
			projects: projects
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