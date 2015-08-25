'use strict';

/**
 *	Client side class for the HTML5 video player - deals with events and updating the UI
 *
 *	@class Video
 */
Core.video = class Video {

	/**
	 *	Constructor which accepts a DOM node
	 */
	constructor(video, hud) {
		this.video = video;
		this.loaded_progress_bar = hud.getElementsByClassName('video__hud__progress__container__loaded')[0];
		this.timeline_indicator = hud.getElementsByClassName('video__hud__timeline__indicator')[0];
		this.attachEvents();
	}

	/**
	 *	Basic video control functions
	 */
	play () {
		this.video.play();
	}
	pause() {
		this.video.pause();
	}
	toggleMute () {
		if(this.video.muted) {
			this.video.muted = false;
		}
		else {
			this.video.muted = true;
		}
	}

	/** 
	 *	Seek to a part of the video given a percentage
	 */
	seekTo (percent) {
	}

	/**
	 *	Function to attach events to the video player
	 */
	attachEvents () {
		let events = [
			{name: 'progress', callback: this.progressed},
			{name: 'timeupdate', callback: this.timeupdated},
			{name: 'ended', callback: this.ended}
		];

		events.map((ev) => {
			this.video.addEventListener(ev.name, ev.callback.bind(this));
		});
	}

	/**
	 *	Function to update the UI on progress
	 */
	progressed (progress) {
		let timeranges 			= this.video.buffered,
				buffered_start 	= timeranges.start(0),
				buffered_end 		= timeranges.end(timeranges.length - 1),
				buffered_diff		= buffered_end - buffered_start,
				duration 				= this.video.duration,
				percentage			= Math.ceil((buffered_diff / duration) * 100);

		this.loaded_progress_bar.style.width = `${percentage}%`;
	}

	/**
	 *	Function to update the UI on time update
	 */
	timeupdated () {
		let percent = Math.ceil((this.video.currentTime / this.video.duration) * 100);
		this.timeline_indicator.style.left = `${percent}%`;
	}

	/**
	 *	Function to update the UI when the video has ended
	 */
	ended () {
	}

};