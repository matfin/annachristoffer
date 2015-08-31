'use strict';

Meteor.startup(() => {

	if(Meteor.isServer) {
		if(Meteor.settings && Meteor.settings.app && Meteor.settings.app.contentful) {
			console.log('Booting server with Contentful enabled.');
			MeteorContentful.start().fetch('contentTypes').fetch('entries').fetch('assets');    
    	ImageProcessor.observe();
    	MeteorContentful.listen();
		}
		else {
			console.log('Booting server with Contentful disabled.');
		}	

		Wistia.refresh();
		Services.prerender.start();
	}

	if(Meteor.isClient) {
		Device.reset();
		Dependencies.start();
		Core.social.facebook.init();
		Core.social.pinterest.init();
		Core.social.google.init();
		window.prerenderReady = false;
	}
	
});