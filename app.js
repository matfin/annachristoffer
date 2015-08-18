Meteor.startup(function() {
	if(Meteor.isClient) {
	}

	if(Meteor.isServer) {
		
		if(Meteor.settings && Meteor.settings.app && Meteor.settings.app.contentful) {
			console.log('Booting server with Contentful enabled.');
			MeteorContentful.start().fetch('contentTypes').fetch('entries').fetch('assets');    
    	ImageProcessor.observe();

    	Meteor.publish('entries', function() {
    		console.log('Publishing: entries');
    		return Collections.entries.find({});
    	});

    	Meteor.publish('images', function() {
    		console.log('Publishing: images');
    		return Collections.images.find({});
    	});

    	Meteor.publish('contentTypes', function() {
    		console.log('Publishing: contentTypes');
    		return Collections.contentTypes.find({});
    	});

		}
		else {
			console.log('Booting server with Contentful disabled.');
		}	

	}
});