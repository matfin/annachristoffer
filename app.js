Meteor.startup(function() {
	if(Meteor.isClient) {

		/**
		 *	Setting the device parameters
		 */
		Device.reset();

		/**
		 *	Loading localised content
		 */
		// Helpers.loadLocalisedContent();
	}

	if(Meteor.isServer) {
		console.log('Server: Meteor starting up.');

		var te = Server.httpFetch(Server.baseURL + '/content/en/content.json');
	
		te.then(function(success) {
			console.log('Success: ', success);
		}).fail(function(error) {
			console.log('Error: ', error);
		})
	}
});