'use strict';

/**
 *	Client side class for the HTML5 video player - deals with events and updating the UI
 *
 *	@class Player
 */
Core.player = class Player {

	/**
	 *	Constructor which accepts a DOM node
	 */
	constructor(video, hud) {
		if(typeof hud === 'undefined' || typeof video === 'undefined') return;
		this.video = video;
		this.isPlaying = false;
		this.loaded_progress_bar = hud.getElementsByClassName('video__hud__progress__container__loaded')[0];
		this.timeline_indicator = hud.getElementsByClassName('video__hud__timeline__indicator')[0];
		this.attachEvents();
	}

	/**
	 *	Basic video control functions
	 */
	play () {
		this.video.play();
		this.isPlaying = true;
	}
	pause() {
		this.video.pause();
		this.isPlaying = false;
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
		let seek = Math.floor(this.video.duration * (percent / 100));
		this.video.currentTime = seek;
	}

	/**
	 *	Function to request full screen video
	 */
	goFullscreen () {
		let fullscreens = [
			'requestFullScreen',
			'webkitRequestFullScreen',
			'mozRequestFullScreen',
			'msRequestFullScreen'
		];

		fullscreens.forEach((fullscreen) => {
			if(typeof this.video[fullscreen] === 'function') {
				this.video[fullscreen]();
			}
		});

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
		this.seekTo(0);
		this.isPlaying = false;
	}

};