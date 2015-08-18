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
	isHD: false,
	isDesktop: false,
	isTablet: false,
	isMobile: false,
	isTouchCapable: false,

	/**
	 *	Function to set various device parameters called when the app is first run.
	 *	
	 *	@method reset
	 *	@return undefined - returns nothing
	 */
	reset: function() {
		this.windowWidth = window.innerWidth;
		this.pixelRatio = Math.floor(window.devicePixelRatio);
		this.isHD = this.windowWidth > 1600;
		this.isDesktop = this.windowWidth > 1280 && this.windowWidth <= 1600;
		this.isTablet = this.windowWidth <= 1024 && this.windowWidth > 640;
		this.isMobile = this.windowWidth <= 640;
		this.isTouchCapable = 'ontouchstart' in document.documentElement;
	}
};