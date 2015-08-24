'use strict';

/**
 * Used to determine device specifications and parameters.
 *
 * @class Device
 * @static
 */
Device = {
	windowWidth: false,
	pixelRatio: false,
	name: '',
	isHD: false,
	isDesktop: false,
	isTablet: false,
	isMobile: false,
	isTouchCapable: false,

	/**
	 *	Function to get the device name
	 *
	 *	@method getName
	 *	@return {String} - either hd, desktop, tablet or mobile
	 */
	getName() {
		if(this.isTablet) return 'tablet';
		if(this.isMobile) return 'mobile';
		return 'desktop';
	},

	/**
	 *	Function to set various device parameters called when the app is first run.
	 *	
	 *	@method reset
	 *	@return undefined - returns nothing
	 */
	reset() {
		this.windowWidth = window.innerWidth;
		this.pixelRatio = Math.floor(window.devicePixelRatio);
		this.isHD = this.windowWidth > 1280;
		this.isDesktop = this.windowWidth > 1024 && this.windowWidth <= 1280;
		this.isTablet = this.windowWidth <= 768 && this.windowWidth > 1024;
		this.isMobile = this.windowWidth <= 768;
		this.name = this.getName();
		this.isTouchCapable = 'ontouchstart' in document.documentElement;
	}
};