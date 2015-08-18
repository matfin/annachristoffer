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
		
		Core = {
			app: {
				collections: {
					entries: new Mongo.Collection('entries'),
					images: new Mongo.Collection('images'),
					contentTypes: new Mongo.Collection('contentTypes')
				}
			}
		};

		Meteor.subscribe('entries');
		Meteor.subscribe('images');
		Meteor.subscribe('contentTypes');

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