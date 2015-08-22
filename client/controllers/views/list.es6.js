'use strict';

/**
 *	Template.views_list
 *	Callback function called automatically when the template has been created
 *
 *	@method created
 */
Template.views_list.onCreated(function() {
	this.subscribe('entries', 'Project');
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
	projects: () => Core.collections.entries.find({contentTypeName: 'Project'}, {sort: {'fields.createdAt': -1}}).fetch()
});

