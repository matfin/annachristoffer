'use strict';

/**
 *	Template.partials_social
 *	Callback function called automatically when the template has been created
 *
 *	@method created
 */
Template.partials_social.onCreated(function() {
});

/**
 *	Template.partials_social
 *	Callback function called automatically when the template has been rendered
 *
 *	@method rendered
 */
Template.partials_social.onRendered(function() {
});

/**
 *	Template.partials_social
 *	Callback function called automatically when the template has been destroyed
 *
 *	@method destroyed
 */
Template.partials_social.onDestroyed(function() {
});

/** 
 *	Template.partials_social
 *	Events
 */
Template.partials_social.events({

	'click .social__button--open': (e, template) => {
		template.$('.social__button').toggleClass('social__button--revealed');
	}

});