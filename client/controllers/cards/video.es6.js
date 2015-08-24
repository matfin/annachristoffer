'use strict';

/**
 *	Template.cards_video
 *	Callback function called automatically when the template has been created
 *
 *	@method created
 */
Template.cards_video.onCreated(function() {
	this.dependency = new Tracker.Dependency;
	this.data.image = this.data.fields.images.find((image) => typeof image.sys.id !== 'undefined');
	this.video_handle = this.subscribe('videos', this.data.fields.videoSource);
	this.image_handle = this.subscribe('images', this.data.image.sys.id);
});

/**
 *	Template.cards_video
 *	Callback function called automatically when the template has been rendered
 *
 *	@method rendered
 */
Template.cards_video.onRendered(function() {
});

/**
 *	Template.cards_video
 *	Callback function called automatically when the template has been destroyed
 *
 *	@method destroyed
 */
Template.cards_video.onDestroyed(function() {
	this.video_handle.stop();
	this.image_handle.stop();
});

/**
 *	Template.cards_video
 *	Helper functions
 */
Template.cards_video.helpers({
	poster () {
		Dependencies.resized.depend();
		let selector = {
			'asset_id': this.image.sys.id,
			'device': Device.name,
			'density.multiplier': Device.pixelRatio
		},
		image = Core.collections.images.findOne(selector);
		return `${Core.helpers.mediaUrl()}/${image.filename}`;
	},
	video () {
		Dependencies.resized.depend();
		let selector = {
			'hashed_id': this.fields.videoSource
		},
		video 			= Core.collections.videos.findOne(selector),
		type 				= Core.helpers.wistiaVideoType(Device.name),
		contentType = 'video/mp4';
		
		return video.assets.find((asset) => asset.contentType === contentType && asset.type === type);
	}
});