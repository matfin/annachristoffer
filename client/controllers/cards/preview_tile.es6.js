'use strict';

/**
 *	Template.cards_preview_tile
 *	Callback function called automatically when the template has been created
 *
 *	@method created
 */
Template.cards_preview_tile.onCreated(function() {
	Meteor.subscribe('images', this.data.fields.previewImage.sys.id);
	Meteor.subscribe('categories');
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
		return Core.helpers.imgSource(this.fields.previewImage.sys.id);
	},

	/**
	 *	Determines the current highlight state of the tile
	 */
	highlighted () {
		let category_ids 	= this.fields.categories.map((category) => category.sys.id),
				categories 		= Core.collections.categories.find({'sys.id': {$in: category_ids}}).fetch(),
				current 			= Router.current().params._slug,
				found 				= categories.find((category) => category.fields.slug === current);

		return found ? 'preview__tile__flip__front--highlighted':'';
	}
});