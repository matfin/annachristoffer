Meteor.startup(function() {
	if(Meteor.isServer) {
		if(Meteor.settings && Meteor.settings.app && Meteor.settings.app.contentful) {
			console.log('Booting server with Contentful enabled.');
			MeteorContentful.start().fetch('contentTypes').fetch('entries').fetch('assets');    
    	ImageProcessor.observe();
		}
		else {
			console.log('Booting server with Contentful disabled.');
		}	
	}
});