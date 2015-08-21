'use strict';

/**
 *	Template.cards_image
 *	Callback function called automatically when the template has been created
 *
 *	@method created
 */
Template.cards_image.onCreated(function() {
	Meteor.subscribe('images', this.data.sys.id);
});

/**
 *	Template.cards_image
 *	Callback function called automatically when the template has been rendered
 *
 *	@method rendered
 */
Template.cards_image.onRendered(function() {
});

/**
 *	Template.cards_image
 *	Callback function called automatically when the template has been destroyed
 *
 *	@method destroyed
 */
Template.cards_image.onDestroyed(function() {
});

/**
 *	Template.cards_image
 *	Helper functions
 */
Template.cards_image.helpers({
	image () {
		Dependencies.resized.depend();
		let selector = {
			'asset_id': this.sys.id,
			'device': Device.name,
			'density.multiplier': Device.pixelRatio
		};
		return Core.collections.images.findOne(selector);
	}
});