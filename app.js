Meteor.startup(function() {
	if(Meteor.isClient) {

		/**
		 *	Setting the device parameters
		 */
		Device.reset();

		/**
		 *	Set up scrolling for lazy loading
		 */
		Device.initScroll();

		/**
		 *	Init social plugins
		 */
		Social.Facebook.initSDK();
		Social.Pinterest.initSDK();
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