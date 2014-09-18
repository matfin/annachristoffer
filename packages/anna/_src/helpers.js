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
	 *	Helper to implement cross-browser fullscreen video
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
	},

	/**
	 *	Function to randomly select an element 
	 *	@method randomlySelectProjectCard
	 *	@param className {String}	the class name of the object
	 *	@return {Object} the dom node for the project card object
	 */

	randomlySelectProjectCard: function(className) {
		if(typeof className === 'undefined') {
			className = '.projectCard';
		}

		var cardCount = App.models.projects.find({}).count(),
			cardIndex = _.random(0, cardCount);

		return $(className).eq(cardIndex);

	}
};