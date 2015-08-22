'use strict';

/**
 *	Template.cards_caption
 *	Callback function called automatically when the template has been created
 *
 *	@method created
 */
Template.cards_caption.onCreated(function() {
});

/**
 *	Template.cards_caption
 *	Callback function called automatically when the template has been rendered
 *
 *	@method rendered
 */
Template.cards_caption.onRendered(function() {
});

/**
 *	Template.cards_caption
 *	Callback function called automatically when the template has been destroyed
 *
 *	@method destroyed
 */
Template.cards_caption.onDestroyed(function() {
});

/**
 *	Template.cards_caption
 *	Helper functions
 */
Template.cards_caption.helpers({
	hasText () {
		return typeof this.fields.paragraphs !== 'undefined';
	}, 
	useSlider () {
		return this.fields.images.length > 1;
	},
	standaloneImage () {
		return this.fields.images[0];
	} 
});