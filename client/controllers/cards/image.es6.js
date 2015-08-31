'use strict';

/**
 *	Template.cards_image
 *	Callback function called automatically when the template has been created
 *
 *	@method created
 */
Template.cards_image.onCreated(function() {
	this.dependency = new Tracker.Dependency;
	this.handle = this.subscribe('images', this.data.sys.id, () => {this.dependency.changed()});
});

/**
 *	Template.cards_image
 *	Callback function called automatically when the template has been rendered
 *
 *	@method rendered
 */
Template.cards_image.onRendered(function() {
	this.lazyloader = this.autorun(() => {
		this.dependency.depend();
		Dependencies.scrolled.depend();
		if(this.handle.ready()) {
			setTimeout(() => {
				let image = this.$('img').get(0);
				Core.helpers.lazyLoad(image).then(() => {
					this.$('.partials__loading').remove();
					image.classList.add('media__image--loaded');
				});
			}, 50);
		}
	});
});

/**
 *	Template.cards_image
 *	Callback function called automatically when the template has been destroyed
 *
 *	@method destroyed
 */
Template.cards_image.onDestroyed(function() {
	this.handle.stop();
});

/**
 *	Template.cards_image
 *	Helper functions
 */
Template.cards_image.helpers({
	image () {
		return Core.helpers.imgSource(this.sys.id);
	}
});

/**
 *	Template.cards_image
 *	Events
 */
Template.cards_image.events({

	'click .media__pinterest': (e, template) => {
		if(PDK) {
			let image = Core.helpers.imgSource(template.data.sys.id, 'desktop'),
					note 	= template.data.fields.title,
					url		= window.location.href;
			PDK.pin(image, note, url, () => {
				ga('send', 'event', 'share', 'pinterest', url);
			});
		}
	}

});