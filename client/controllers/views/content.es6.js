'use strict';

/**
 *	Template.views_content
 *	Callback function called automatically when the template has been created
 *
 *	@method created
 */
Template.views_content.onCreated(function() {
	this.pageDependency 	= new Tracker.Dependency;
	this.pageHandle 			= this.subscribe('pages', {'fields.slug': this.data.slug}, () => this.pageDependency.changed());
	this.subscribe('experiences');

	this.autorun(() => {
		this.pageDependency.depend();
		if(this.pageHandle.ready()) {
			let page 		= Core.collections.pages.findOne({'fields.slug': this.data.slug}),
					itemIds = page.fields.contentItems.map((item) => item.sys.id);
			this.subscribe('contentitems', {'sys.id': {$in: itemIds}});
			Core.seo.refreshFromPage(this.data.slug);
			Core.social.google.trackContentView(this.data.slug);
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
	window.prerenderReady = true;
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
	
	contentItems () {
		return Core.collections.contentitems.find({}).fetch();
	},

	image () {
		let page = Core.collections.pages.findOne();
		if(typeof page.fields === 'undefined' || typeof page.fields.images === 'undefined' || page.fields.images.length === 0) return;
		return page.fields.images[0];
	},

	experience (type) {
		return {
			title: type,
			items: Core.collections.experiences.find({'fields.type': type}, {sort: {'fields.startDate': -1}}).fetch()
		}
	}
});