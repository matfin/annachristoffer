'use strict';

/**
 *	Template.cards_slider
 *	Callback function called automatically when the template has been created
 *
 *	@method created
 */
Template.cards_slider.onCreated(function() {
});

/**
 *	Template.cards_slider
 *	Callback function called automatically when the template has been rendered
 *
 *	@method rendered
 */
Template.cards_slider.onRendered(function() {
	let slider_container = this.$('.slider__container').get(0);
	this.slider = Slider.setup(slider_container);
});

/**
 *	Template.cards_slider
 *	Callback function called automatically when the template has been destroyed
 *
 *	@method destroyed
 */
Template.cards_slider.onDestroyed(function() {
});

/**
 *	Template.cards_slider
 *	Helper functions
 */
Template.cards_slider.helpers({
	sliderWidth () {
		return this.fields.images.length * 100;
	}
});