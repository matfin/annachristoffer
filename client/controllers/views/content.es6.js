'use strict';

/**
 *	Template.views_content
 *	Callback function called automatically when the template has been created
 *
 *	@method created
 */
Template.views_content.onCreated(function() {
	this.pageDependency 	= new Tracker.Dependency;
	this.pageHandle 			= this.subscribe('entries', 'Page', {'fields.slug': this.data.slug}, () => this.pageDependency.changed());
	this.subscribe('entries', 'Experience');

	this.autorun(() => {
		this.pageDependency.depend();
		if(this.pageHandle.ready()) {
			Core.seo.refreshFromPage(this.data.slug);
		}
	});

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
	
	page () {
		return Core.collections.entries.findOne({contentTypeName: 'Page', 'fields.slug': this.slug});
	},

	image () {
		let page = Core.collections.entries.findOne({contentTypeName: 'Page', 'fields.slug': this.slug});
		if(typeof page.fields === 'undefined' || typeof page.fields.images === 'undefined' || page.fields.images.length === 0) return;
		return page.fields.images[0];
	},

	experience (type) {
		return {
			title: type,
			items: Core.collections.entries.find({contentTypeName: 'Experience', 'fields.type': type}, {sort: {'fields.startDate': -1}}).fetch()
		}
	}
});