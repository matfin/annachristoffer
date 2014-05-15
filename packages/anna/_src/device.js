/**
 * Used to determine device specifications and parameters.
 *
 * @class Device
 * @static
 */
Device = {
	windowWidth: false,
	isRetina: false,
	isHD: false,
	isDesktop: false,
	isTablet: false,
	isMobile: false,
	isTouchCapable: false,

	reset: function() {

		this.windowWidth = $(window).width();
		this.isRetina = window.devicePixelRatio > 1;
		this.isHD = this.windowWidth >= 1600;
		this.isDesktop = this.windowWidth > 1280 && this.windowWidth < 1600;
		this.isLaptop = this.windowWidth > 1024 && this.windowWidth < 1280;
		this.isTablet = this.windowWidth <= 1024 && this.windowWidth > 768;
		this.isMobile = this.windowWidth >= 320 && this.windowWidth <= 768;
		this.isTouchCapable = 'ontouchstart' in document.documentElement;
	}
};

/**
 *	Events to call changes on dependencies
 */
$(window).on('resize', _.debounce(function() {
	Device.reset();
	Dependencies.viewportResizeDependency.changed();
}, 500));