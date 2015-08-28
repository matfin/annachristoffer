'use strict';

/**
 *	Template.views_list
 *	Callback function called automatically when the template has been created
 *
 *	@method created
 */
Template.views_list.onCreated(function() {
	this.pageDependency 	= new Tracker.Dependency;
	this.pageHandle 			= this.subscribe('entries', 'Page', {'fields.slug': 'overview'}, () => this.pageDependency.changed());
	this.subscribe('entries', 'Project');

	this.autorun(() => {
		this.pageDependency.depend();

		if(this.pageHandle.ready()) {
			let page 	= Core.collections.entries.findOne({contentTypeName: 'Page', 'fields.slug': 'overview'}),
					asset,
					image;

			if(typeof page === 'undefined') return;
			asset = page.fields.images.find((image) => image.fields.description === 'seo');

			if(typeof asset !== 'undefined') {
				this.imagesHandle = this.subscribe('images', asset.sys.id, () => {
					Core.seo.refresh({
						title: page.fields.title,
						description: page.fields.description,
						image: Core.helpers.imgSource(asset.sys.id),
						url: window.location.href,
						type: 'website'
					});
				});
			}	
			else {
				Core.seo.refresh({
					title: page.fields.title,
					description: page.fields.description,
					image: '',
					url: window.location.href,
					type: 'website'
				});
			}
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

