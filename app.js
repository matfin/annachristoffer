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

		console.log(Server);
	}

	if(Meteor.isServer) {
		console.log('Server: Meteor starting up.');

		Server.updateCollections().then(function(result){
			console.log('Success updating collections: ', result);
		}).fail(function(error) {
			console.log('Error updating collections: ', error);
		});
	}
});