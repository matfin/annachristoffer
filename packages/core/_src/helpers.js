/**
 * Collection of generic helper functions the app will need.
 *
 * @class Helpers
 * @static
 */
Helpers = {
	
	/**
	 *	Method to return a nicely formatted String with the number of minutes
	 *	and seconds given seconds.
	 *	@method formattedDurationSeconds
	 *	@param {Number}
	 *	@return {String}
	 */
	formattedDurationSeconds: function(seconds) {
		var minutes = Math.floor(seconds / 60),
			seconds = Math.floor(seconds % 60);
		return minutes + ':' + (seconds < 10 ? '0' + seconds : seconds);
	},

	/**
	 *	Function to return the correct path for videos given the device screen resolution.
	 *	
	 *	@method loadVideoSource
	 *	@param {String}		the string for the video url
	 *	@return {String}	the video path 
	 */
	loadVideoSource: function(video) {

		var videoSource = '';

		if(video && typeof video !== 'undefined') {
			if(Device.isHD) {
				videoSource = video + '-hd';
			}
			else if(Device.isDesktop || Device.isLaptop || Device.isTablet) {
				videoSource = video + '-d';
			}
			else {
				videoSource = video + '-m';
			}
		}

		return videoSource;
	},

	/**
	 *	Function to determine if an element is in the viewport,
	 *	used in conjunction with lazy loading of images.
	 *
	 *	@method isInView
	 *	@param {object} element - the element being checked
	 *	@return {boolean} true if the element is in the viewport or false if not.
	 */
	isInView: function(element) {

		var viewportHeight = $(window).height(),
			element = $(element),
			scrollTop = $(window).scrollTop();
			top = $(element).offset().top;

		return (top - scrollTop) <= viewportHeight;
	},

	/**
	 *	Function to load images when the template has been rendered
	 *
	 *	@method lazyLoadImage
	 *	@param {object} element - element object coming from a selector
	 *	@param {options} callback - optional parameters, including callback and aspect ratio
	 *	@return undefined - returns nothing
	 */
	lazyLoadImage: function(element, options) {
		
		/**
		 *	Grab the data we need
		 */
		var img = $(element),
			loaded = img.hasClass('loaded'),
			visible = this.isInView(element),
			src = img.data('src'),
			width = img.width();
			height = (options.height || width * 0.75);
			image = new Image();

		if(!loaded) {
			/**
			 *	Set a temporary height given the width
			 */
			img.height(height);
		}

		if(!loaded && visible) {
			
			/**
			 *	Set the source, which kicks off loading...
			 */
			image.src = src;

			/**
			 *	Then listen for when it has loaded, runing the callback
			 *	when loading has finished.
			 */
			image.onload = function() {
				if(typeof options !== 'undefined' && options.callback !== 'undefined') {
					options.callback();
				}
			}
		}
	},

	/**
	 *	Given various device parameters, such as screen pixel density and resolution,
	 *	this helper function will determine the correct image to load given a path.
	 *	
	 *	@method loadImageSource
	 *	@param {String}		the string for the image path
	 *	@param {Object}		Options. Possible values are options.extension, options.isThumbnail
	 *	@return {String}	the image path with file extension
	 */
	loadImageSource: function(img, options) {
		/**
		 *	If the extension is not specified, use jpg as default
		 */

		if(typeof options === 'undefined') {
			options = {};
		}

		if(typeof options.extension === 'undefined') {
			options.extension = 'jpg';
		}

		if(typeof options.isThumbnail === 'undefined') {
			options.isThumbnail = false;
		}

		/**
		 *	When we want to force-load an image and bypass 
		 *	device parameters like screen size and pixel density.
		 */
		if(typeof options.forcedSelection !== 'undefined') {
			return img + options.forcedSelection + '.' + options.extension;
		}

		var imgSource = '';

		if(img && typeof img !== 'undefined') {

			if(options.isThumbnail) {
				imgSource = img;
			}
			else if(Device.isHD || Device.isDesktop) {
				imgSource = img + '-hd';
			}
			else if(Device.isLaptop || Device.isTablet) {
				imgSource = img + '-d';
			}
			else {
				imgSource = img;
			}

			if(Device.isRetina) {
				return imgSource + '@2x.' + options.extension;
			}
			else {
				return imgSource + '.' + options.extension;
			}
		}
	},

	/**
	 *	Helper to return a nicely formatted date using moment.js
	 *	
	 *	@method formattedDate
	 *	@param {String} dateString -	The date string, which should be in the format "YYYY-MM-DD" ie: "2013-04-26".
	 *	@param {String} dateFormat -	The formatting for the date to be displayed.
	 *	@param {String} language   -	Optional language parameter.
	 *	@return {String} The formatted date
	 */
	formattedDate: function(dateString, dateFormat, language) {
		var language = (typeof App !== 'undefined' && App.language !== 'undefined') ? App.language:language;
		moment.locale(language);
		var m = moment(dateString);
		return m.isValid() ? m.format(dateFormat):dateString; 
	},

	/**
	 *	Helper to implement cross-browser fullscreen video
	 *
	 *	@method videoRequestFullscreen
	 *	@param {DomElement} the dom element for the video
	 *	@return undefined
	 */
	videoRequestFullscreen: function(video) {
		if(video.requestFullScreen) {
			video.requestFullScreen();
		}
		else if(video.webkitRequestFullScreen) {
			video.webkitRequestFullScreen();
		}
		else if(video.webkitSupportsFullscreen) {
			video.webkitEnterFullscreen();
		}
		else if(video.mozRequestFullScreen) {
			video.mozRequestFullScreen();
		}
		else if(video.msRequestFullScreen) {
			video.msRequestFullScreen();
		}
		else {
			throw {
				error: 'FullScreenException',
				message: 'Cross browser fullscreen video failed.'
			}
		}
	}
};