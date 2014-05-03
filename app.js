Meteor.startup(function() {
	if(Meteor.isClient) {
		console.log('Client: Meteor starting up.');
	}

	if(Meteor.isServer) {
		console.log('Server: Meteor starting up.');
	}
});