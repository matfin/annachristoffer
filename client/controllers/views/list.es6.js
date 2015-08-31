'use strict';

/**
 *	Template.views_list
 *	Callback function called automatically when the template has been created
 *
 *	@method created
 */
Template.views_list.onCreated(function() {
	this.pageDependency 	= new Tracker.Dependency;
	this.pageHandle 			= this.subscribe('pages', {'fields.slug': 'overview'}, () => this.pageDependency.changed());
	this.subscribe('projects');

	this.autorun(() => {
		this.pageDependency.depend();
		if(this.pageHandle.ready()) {
			Core.seo.refreshFromPage('overview');
			Core.social.google.trackCategoryView(this.data.slug);
		}
	});
});

/**
 *	Template.views_list
 *	Callback function called automatically when the template has been rendered
 *
 *	@method rendered
 */
Template.views_list.onRendered(function() {
	window.prerenderReady = true;
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
	projects: () => Core.collections.projects.find({}, {sort: {'fields.createdAt': -1}}).fetch()
});

