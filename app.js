Meteor.startup(function() {
	if(Meteor.isClient) {

		/**
		 *	Setting the device parameters
		 */
		Device.reset();

	}

	if(Meteor.isServer) {
		console.log('Server: Meteor starting up.');
		Server.updateAndPublishCollections().then(function(result){
			console.log('Success updating collections');
		}).fail(function(error) {
			console.log('Error updating collections: ', error);
		});
	}
});