/**
 * Collection of generic helper functions the app will need.
 *
 * @class Helpers
 * @static
 */
Helpers = {

	/**
	 *	Passing initialised moment() library in here.
	 */
	moment: moment,

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
	 *	Method to load localised data which is called when the app is first run.
	 *	and when the user opts to switch langage. It is important to node that
	 *	the app language parameter (en|de) is set within the App object and does not
	 *	need to be passed in here as a parameter. 
	 *	
	 *	@method loadLocalisedContent
	 *	@return undefined
	 */
	loadLocalisedContent: function() {
		/**
		 *	Each of these corresponds to the json files we have stored 
		 *	for each language.
		 */
		var contents = [
			'content',
			'pages',
			'projects',
			'categories',
			'formations'
		];

		/**
		 *	Loop through these and load the content for each, 
		 *	making sure to clear out old content. This is useful
		 *	for easily switching language within the app.
		 */

		_.each(contents, function(contentItem) {

			/**
			 *	Clear out old content that may already exist
			 */
		    App.models[contentItem].remove({});

		    /**
		     *	Then populate from the local json files.
		     */

			Api.fetch(contentItem).then(function(data) {
				_.each(data.items, function(item){
					App.models[contentItem].insert(item);
				});
			}).fail(function(error) {
				console.log(error);
			});
		});
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
	 *	Load localised content via message codes from the content collection
	 *	
	 *	@method loadMessageCode
	 *	@param {String}		the string for the image path
	 *	@return {String}	the image path with file extension
	 */
	loadMessageCode: function(messageCode) {
		var message = App.models.content.findOne({"messageCode": messageCode});
		return typeof message !== 'undefined' ? message.content:'NOT FOUND';
	},

	/**
	 *	Fetch cross browser transition end event name 
	 *	@method transitionEndEventName
	 *	@return {String} the correct transition end event name
	 */
	transitionEndEventName: function() {
		var i, undefined;
		var el = document.createElement('div');
		var transitions = {
			'transition': 'transitionend',
			'OTransition': 'otransitionend',
			'MozTransition': 'transitionend',
			'WebkitTransition': 'webkitTransitionEnd'
		};

		for(i in transitions) {
			if(transitions.hasOwnProperty(i) && el.style[i] !== 'undefined') {
				return transitions[i];
			}
		}

		return 'na';
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

	},

	/**
	 *	Globally accessible promise we can use from within our controllers
 	 *	
 	 *	@attribute	{Object}	The promise object from the Q package.
	 */
	promise: Q
};