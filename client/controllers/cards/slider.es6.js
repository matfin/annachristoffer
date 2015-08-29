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
	this.$('.slider__indicator__button').eq(0).addClass('active');
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

/**
 *	Template.cards_slider
 *	Events
 */
Template.cards_slider.events({

	'click .slider__container__paddle': (e, template) => {
		let direction = e.currentTarget.dataset.go;
		template.slider.go(direction);
		ga('send', 'event', 'slider', 'move');
	},

	'slidecomplete .slider__container': (e, template) => {
		let current_slide = template.slider.currentSlide,
				total_slides	= template.slider.slides.length;

		if(current_slide === 0) {
			template.$('.slider__container__paddle--previous').addClass('slider__container__paddle--hidden');
		}
		else if(current_slide === total_slides - 1) {
			template.$('.slider__container__paddle--next').addClass('slider__container__paddle--hidden');
		}
		else {
			template.$('.slider__container__paddle').removeClass('slider__container__paddle--hidden');
		}

		template.$('.slider__indicator__button').removeClass('active');
		template.$('.slider__indicator__button').eq(current_slide).addClass('active');
	}

});