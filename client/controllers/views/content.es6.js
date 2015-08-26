'use strict';

/**
 *	Template.views_content
 *	Callback function called automatically when the template has been created
 *
 *	@method created
 */
Template.views_content.onCreated(function() {
	this.subscribe('entries', 'Content Item', {'fields.page': this.data.slug});
	this.subscribe('entries', 'Experience');
});

/**
 *	Template.views_content
 *	Callback function called automatically when the template has been rendered
 *
 *	@method rendered
 */
Template.views_content.onRendered(function() {
});

/**
 *	Template.views_content
 *	Callback function called automatically when the template has been destroyed
 *
 *	@method destroyed
 */
Template.views_content.onDestroyed(function() {
});

/**
 *	Template.views_content
 *	Helper functions
 */
Template.views_content.helpers({
	
	items () {
		return Core.collections.entries.find({contentTypeName: 'Content Item', 'fields.page': this.slug}, {sort: {'fields.order': -1}}).fetch();
	},

	experience (type) {
		return {
			title: type,
			items: Core.collections.entries.find({contentTypeName: 'Experience', 'fields.type': type}, {sort: {'fields.startDate': -1}}).fetch()
		}
	}
});