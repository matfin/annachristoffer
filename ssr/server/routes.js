var seoPicker = Picker.filter(function(request, result) {
	return /_escaped_fragment_/.test(request.url);
});

seoPicker.route('/', function(params, request, result) {

	var projects = Server.dataSources.projects.collection.find({}).fetch(),
		content = {
			title: Server.dataSources.staticContent.collection.findOne({slug: 'title'}),
			subTitle: Server.dataSources.staticContent.collection.findOne({slug: 'subtitle'}),
			projects: Server.dataSources.staticContent.collection.findOne({slug: 'projects'})
		}

	var html = SSR.render('layout', {
		template: 'home',
		data: {
			projects: projects,
			content: content
		}
	});

	result.end(html);

});