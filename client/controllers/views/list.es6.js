'use strict';

/**
 *	Template.views_list
 *	Callback function called automatically when the template has been created
 *
 *	@method created
 */
Template.views_list.onCreated(function() {
	Meteor.subscribe('entries', 'Project');
});

/**
 *	Template.views_list
 *	Callback function called automatically when the template has been rendered
 *
 *	@method rendered
 */
Template.views_list.onRendered(function() {
});

/**
 *	Template.views_list
 *	Callback function called automatically when the template has been destroyed
 *
 *	@method destroyed
 */
Template.views_list.onDestroyed(function() {
});

/**
 *	Template.views_list
 *	Helper functions
 */
Template.views_list.helpers({
	projects: () => {
		return Core.collections.entries.find({contentTypeName: 'Project'}).fetch();
	}
});

