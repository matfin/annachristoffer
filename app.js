Meteor.startup(function() {
	if(Meteor.isClient) {
		console.log('Client: Meteor starting up.');

		/**
		 *	Setting the device parameters
		 */
		Device.reset();

		/**
		 *	Loading localised content
		 */
		Helpers.loadLocalisedContent();
	}

	if(Meteor.isServer) {
		console.log('Server: Meteor starting up.');
	}
});