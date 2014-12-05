Meteor.startup(function() {
	if(Meteor.isClient) {

		/**
		 *	Setting the device parameters
		 */
		Device.reset();

		/**
		 *	Set up smooth scrolling
		 */
		Device.initSmoothScroll();

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