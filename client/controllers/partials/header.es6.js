'use strict';

/**
 *	Template.partials_header
 *	Callback function called automatically when the template has been created
 *
 *	@method created
 */
Template.partials_header.onCreated(function() {
	Meteor.subscribe('entries', 'Project Category');
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
	categories: () => Core.collections.entries.find({contentTypeName: 'Project Category'})
});