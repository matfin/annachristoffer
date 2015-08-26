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
	this.video_handle = this.subscribe('videos', this.data.fields.videoSource, () => {this.dependency.changed();});
	this.image_handle = this.subscribe('images', this.data.image.sys.id);
});

/**
 *	Template.cards_video
 *	Callback function called automatically when the template has been rendered
 *
 *	@method rendered
 */
Template.cards_video.onRendered(function() {
	this.autorun(() => {
		if(this.video_handle.ready()) {
			setTimeout(() => {
				let video = this.$('.video').get(0),
						hud 	= this.$('.video__hud').get(0);

				this.player = new Core.player(video, hud);
			}, 50);
		}
	});
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
		if(typeof image === 'undefined') return;
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
		if(typeof video === 'undefined') return;
		return video.assets.find((asset) => asset.contentType === contentType && asset.type === type);
	}
});

/**
 *	Template.cards_video
 *	Events
 */
Template.cards_video.events({

	'click .video__hud__button--play': (e, template) => {
		clearTimeout(template.hudTimeout);
		template.player.play();
		template.$('.video__hud__button--play').addClass('video__hud__button--hidden');
		template.$('.video__hud__button--pause').removeClass('video__hud__button--hidden');
		template.hudTimeout = setTimeout(() => {
			template.$('.video__hud').addClass('video__hud--hidden');
		}, 750);
	},

	'click .video__hud__button--fullscreen': (e, template) => {
		template.player.goFullscreen();
	},

	'mousemove .video, mousemove .video__hud': (e, template) => {
		if(template.player.isPlaying) {
			clearTimeout(template.hudTimeout);
			if(template.$('.video__hud').hasClass('video__hud--hidden')) {
				template.$('.video__hud').removeClass('video__hud--hidden');	
			}
			template.hudTimeout = setTimeout(() => {
				template.$('.video__hud').addClass('video__hud--hidden');
			}, 750);
		}
	},

	'click .video__hud__button--pause': (e, template) => {
		clearTimeout(template.hudTimeout);
		template.player.pause();
		template.$('.video__hud__button--play').removeClass('video__hud__button--hidden');
		template.$('.video__hud__button--pause').addClass('video__hud__button--hidden');
		template.$('.video__hud').removeClass('video__hud--hidden');
	},

	'click .video__hud__timeline': (e, template) => {
		let offset 	= e.offsetX,
				width  	= $(e.currentTarget).width(),
				percent	= Math.ceil((offset / width) * 100);
		template.player.seekTo(percent);
	},

});