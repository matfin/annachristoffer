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
	},

	'click [data-share="facebook"]': (e, template) => {
		FB.ui({
			method: 'share',
			href: window.location.href
		});
		ga('send', 'event', 'share', 'facebook');
	},

	'click [data-share="twitter"]': (e, template) => {
		window.open('https://twitter.com/share?url=' + window.location.href + '&text=Anna%20Christoffer&', 'Tweet', 'height=450, width=550, toolbar=0, location=0, menubar=0, directories=0, scrollbars=0');
		ga('send', 'event', 'share', 'twitter');
	}
	
});