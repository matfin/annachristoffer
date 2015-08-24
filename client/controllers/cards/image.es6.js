'use strict';

/**
 *	Template.cards_image
 *	Callback function called automatically when the template has been created
 *
 *	@method created
 */
Template.cards_image.onCreated(function() {
	this.dependency = new Tracker.Dependency;
	this.handle = this.subscribe('images', this.data.sys.id, () => {
		this.dependency.changed();
	});
});

/**
 *	Template.cards_image
 *	Callback function called automatically when the template has been rendered
 *
 *	@method rendered
 */
Template.cards_image.onRendered(function() {
	this.lazyloader = this.autorun(() => {
		this.dependency.depend();
		Dependencies.scrolled.depend();
		if(this.handle.ready()) {
			let target = this.$('img').get(0);
			Core.helpers.lazyLoad(target).then(() => {
				this.$('.partials__loading').remove();
				target.classList.add('detail__caption__media__image--loaded')
			});
		}
	});
});

/**
 *	Template.cards_image
 *	Callback function called automatically when the template has been destroyed
 *
 *	@method destroyed
 */
Template.cards_image.onDestroyed(function() {
	this.handle.stop();
});

/**
 *	Template.cards_image
 *	Helper functions
 */
Template.cards_image.helpers({
	image () {
		Dependencies.resized.depend();
		let selector = {
			'asset_id': this.sys.id,
			'device': Device.name,
			'density.multiplier': Device.pixelRatio
		},
		image = Core.collections.images.findOne(selector);
		return `${Core.helpers.mediaUrl()}/${image.filename}`;
	}
});