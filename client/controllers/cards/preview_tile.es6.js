'use strict';

/**
 *	Template.cards_preview_tile
 *	Callback function called automatically when the template has been created
 *
 *	@method created
 */
Template.cards_preview_tile.onCreated(function() {
	Meteor.subscribe('images', this.data.fields.previewImage.sys.id);
});

/**
 *	Template.cards_preview_tile
 *	Callback function called automatically when the template has been rendered
 *
 *	@method rendered
 */
Template.cards_preview_tile.onRendered(function() {
});

/**
 *	Template.cards_preview_tile
 *	Callback function called automatically when the template has been destroyed
 *
 *	@method destroyed
 */
Template.cards_preview_tile.onDestroyed(function() {
});

/**
 *	Template.cards_preview_tile
 *	Helper functions
 */
Template.cards_preview_tile.helpers({

	/**
	 *	Function to grab the correct thumbnail given device parameters
	 */
	thumbnail () {
		let selector = {
			'asset_id': this.fields.previewImage.sys.id,
			'device': Device.name,
			'density.multiplier': 1
		};
		return Core.collections.images.findOne(selector);
	},

	/**
	 *	Determines the current highlight state of the tile
	 */
	highlighted () {
		let current_category = Router.current().params._slug,
				found = typeof this.fields.categories.find((category) => category.fields.slug === current_category) !== 'undefined'; 

		return found ? 'preview__tile__flip__front--highlighted':'';
	}
});