Meteor.startup(function() {
	if(Meteor.isClient) {
		console.log('Client: Meteor starting up.');

		/**
		 *	Setting the device parameters
		 */
		Device.reset();

		/**
		 *	Populating content
		 */
		Api.fetch('content').then(function(data) {
			_.each(data.items, function(item){
				App.models.content.insert(item);
			});
		}).fail(function(error) {
			console.log(error);
		});

		/**
		 *	Populating projects
		 */
		Api.fetch('projects').then(function(data) {
			_.each(data.items, function(item){
				App.models.projects.insert(item);
			});
		}).fail(function(error) {
			console.log(error);
		});

		/**
		 *	Populating categories
		 */
		Api.fetch('categories').then(function(data) {
			_.each(data.items, function(item){
				App.models.categories.insert(item);
			});
		}).fail(function(error) {
			console.log(error);
		});

		/**
		 *	Populating formations
		 */
		Api.fetch('formations').then(function(data) {
			_.each(data.items, function(item){
				App.models.formations.insert(item);
			});
		}).fail(function(error) {
			console.log(error);
		});
	}

	if(Meteor.isServer) {
		console.log('Server: Meteor starting up.');
	}
});