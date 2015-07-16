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
	isLaptop: false,
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

		this.windowWidth = $(window).width();
		this.isRetina = window.devicePixelRatio > 1;
		this.isHD = this.windowWidth > 1600;
		this.isDesktop = this.windowWidth > 1280 && this.windowWidth <= 1600;
		this.isLaptop = this.windowWidth > 1024 && this.windowWidth <= 1280;
		this.isTablet = this.windowWidth <= 1024 && this.windowWidth > 640;
		this.isMobile = this.windowWidth <= 640;
		this.isTouchCapable = 'ontouchstart' in document.documentElement;
		this.hasFlexBox = $('html').hasClass('flexbox');
	},

	/**
	 *	Function to enable smooth scrolling by disabling 
	 *	pointer events on all elements while scrolling.
	 *
	 *	@method initScroll
	 *	@return undefined - returns nothing
	 */
	initScroll: function() {
		var body = document.body,
			timer;

		window.addEventListener('scroll', function() {
			timer = setTimeout(function(){
				Dependencies.viewportScrollDependency.changed();
			}, 100);
		}, false);
	}
};

/**
 *	Events to call changes on dependencies
 */
$(window).on('resize', _.throttle(function() {
	Device.reset();
	Dependencies.viewportResizeDependency.changed();
}, App.throttleTimeout));