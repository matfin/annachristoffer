'use strict';

/**
 *	Template.partials_header
 *	Callback function called automatically when the template has been created
 *
 *	@method created
 */
Template.partials_header.onCreated(function() {
	this.subscribe('entries', 'Project Category');
});

/**
 *	Template.partials_header
 *	Callback function called automatically when the template has been rendered
 *
 *	@method rendered
 */
Template.partials_header.onRendered(function() {
});

/**
 *	Template.partials_header
 *	Callback function called automatically when the template has been destroyed
 *
 *	@method destroyed
 */
Template.partials_header.onDestroyed(function() {
});

/**
 *	Template.partials_header
 *	Helper functions
 */
Template.partials_header.helpers({

	categories () { 
		Dependencies.resized.depend();
		return Device.isMobile ? [] : Core.collections.entries.find({contentTypeName: 'Project Category'});
	},

	active () {
		let current_category = Router.current().params._slug,
				found = this.fields.slug === current_category;
		return found ? 'header__navigation__list__item__link--active':'';
	},

	top () {
		Dependencies.scrolled.depend();
		return Device.isMobile ? 0 : window.pageYOffset || document.documentElement.scrollTop; 
	}

});

/**
 *	Template.partials_header
 *	Events
 */
Template.partials_header.events({

	'touchstart .header__button': (e, template) => {
		template.$('.header').toggleClass('header--revealed');
	}

});