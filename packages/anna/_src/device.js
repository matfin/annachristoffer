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
	isInsideWebView: false,

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
	 *	Function to call when the app was loaded inside a 
	 *	devices webview. This will be called from the parent
	 *	webview being run inside the native application that
	 *	contains this web application
	 *
	 *	@method wasLoadedInsideWebView;
	 *	@return undefined - returns nothing
	 */
	wasLoadedInsideWebView: function() {
		this.isInsideWebView = true;
		Dependencies.loadedInWebViewDependency.changed();
	},

	/**
	 *	Function to enable smooth scrolling by disabling 
	 *	pointer events on all elements while scrolling.
	 *
	 *	@method initSmoothScroll
	 *	@return undefined - returns nothing
	 */
	initSmoothScroll: function() {
		var body = document.body,
			timer;

		window.addEventListener('scroll', function() {

			clearTimeout(timer);
			if(!body.classList.contains('scrolling')) {
				body.classList.add('scrolling');
			}

			timer = setTimeout(function(){
				Dependencies.viewportScrollDependency.changed();
				body.classList.remove('scrolling');
			}, 100)
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