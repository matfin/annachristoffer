'use strict';

/**
 *	Template.views_detail
 *	Callback function called automatically when the template has been created
 *
 *	@method created
 */
Template.views_detail.onCreated(function() {
	this.projectDependency = new Tracker.Dependency;
	this.projectHandle = this.subscribe('projects', {'fields.slug': this.data.slug}, () => this.projectDependency.changed());
	
	this.autorun(() => {
		this.projectDependency.depend();
		if(this.projectHandle.ready()) {
			let project 	= Core.collections.projects.findOne({'fields.slug': this.data.slug}),
					itemIds 	= project.fields.items.map((item) => item.sys.id);
			this.subscribe('projectitems', {'sys.id': {$in: itemIds}});
			Core.seo.refreshFromProject(this.data.slug);
			Core.social.google.trackProjectView(this.data.slug);
		}
	});
});

/**
 *	Template.views_detail
 *	Callback function called automatically when the template has been rendered
 *
 *	@method rendered
 */
Template.views_detail.onRendered(function() {
});

/**
 *	Template.views_detail
 *	Callback function called automatically when the template has been destroyed
 *
 *	@method destroyed
 */
Template.views_detail.onDestroyed(function() {
});

/**
 *	Template.views_detail
 *	Helper functions
 */
Template.views_detail.helpers({

	project () {
		return Core.collections.projects.findOne({'fields.slug': this.slug});
	},

	projectItems () {
		let items 	= Core.collections.projectitems.find({}, {sort: {'sys.createdAt': 1}}).fetch();
		items.map((item, index) => {item.index = index});
		return items;
	}
});