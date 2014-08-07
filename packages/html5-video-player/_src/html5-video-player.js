/**
 *	Controls and event listener for custom html5 based video player
 *	
 *	@class Video
 *	@static
 */
Video = {

	/**
	 *	The video DOM node
	 *	
	 *	@property _video
 	 *	@private
	 *	@type {Object}
	 *	@default null
	 */
	_video: null,

	/**
	 *	Object containing events with callback functions to be run when event listeners are added
	 *	
	 *	@property _events
	 *	@private
	 *	@type {Array}
	 *	@default []
	 */
	_events: [],

	/**
	 *	Video loaded state
	 *	
	 *	@property _loaded
	 *	@private
	 *	@type {Boolean}
	 *	@default false
	 */
	_loaded: false,

	/**
	 *	Function to prime the video player
	 *	
	 *	@method setup
	 *	@param {Object} the jQuery node for the video 
	 *	@param {Array} an optional array containing events with callbacks that need to be made
	 *	@return undefined
	 */
	setup: function(video, events) {

		if(typeof video !== 'undefined') {
			this._video = video.get(0);
			this._events = events;
			this._primeEventListeners();
		}
		else {
			throw {
				error: 'Cannot set up video player',
				detail: 'VideoPlayer.setup() must take a video {Html Dom node object} as a parameter: ' + ' You passed in ' + (typeof video)
			}
		}
	},

	/**
	 *	Function to play the video
	 *
	 *	@method play
	 *	@return undefined
	 */
	play: function() {
		this._video.play();
	},

	/**
	 *	Function to pause the video
	 *
	 *	@method pause
	 *	@return undefined
	 */
	pause: function() {
		this._video.pause();
	},

	/**
	 *	Function to stop the video
	 *
	 *	@method stop
	 *	@return undefined
	 */
	stop: function() {
		this._video.stop();
	},

	/**
	 *	Function to mute the video
	 *
	 *	@method mute
	 *	@return undefined
	 */
	mute: function() {
		this._video.muted = true;
	},

	/**
	 *	Function to unmute the video
	 *
	 *	@method unmute
	 *	@return undefined
	 */
	unmute: function() {
		this._video.muted = false;
	},

	/**
	 *	Function which returns a promise when the video metadata has loaded
	 *	
	 *	@method verifyMetaDataLoaded
	 *	@return {Object} - 	a resolved promise if the video metadata has loaded 
	 *						within ten seconds, or a rejected promise.
	 */
	checkMetaDataLoaded: function() {
		var deferred = Helpers.promise.defer(),
			self = this;

		Meteor.setTimeout(function() {
			deferred.reject('A problem!');
		}, 10000);

		var checkInterval = Meteor.setInterval(function() {
			/**
			 *	Readystate 1 equates to the constant HAVE_METADATA.
			 *	When we are happy it has loaded, we kill the interval.
			 *
			 *	For iOS devices, the readystate is always 0 so we need
			 *	to resolve the promise if the canPlay event has fired.
			 */
			console.log('Checking...');
			if(self._video.readyState !== 0) {
				Meteor.clearInterval(checkInterval);
				deferred.resolve();
			};

		}, 500);

		self._video.addEventListener('loadstart', function() {
			Meteor.clearInterval(checkInterval);
			deferred.resolve();
		});

		return deferred.promise;
	},

	/**
	 *	Function to return the pause state of the video
	 *
	 *	@method paused
	 *	@return {Boolean}
	 */
	paused: function() {
		return this._video.paused;
	},

	/**
	 *	Function to return the muted state of the video
	 *
	 *	@method muted
	 *	@return {Boolean}
	 */
	muted: function() {
		return this._video.muted;
	},

	/**
	 *	Function to determine if the video is loaded
	 *
	 *	@method isLoaded
	 *	@return {Boolean}
	 */
	isLoaded: function() {
		return this._loaded;
	},

	/**
	 *	Function to return formatted times and percentage of video played
	 *
	 *	@method times
	 *	@return {Object} formattedDuration in minutes and seconds, 
	 *	likewise with formattedCurrentTime and an integer showing 
	 *	the percentage of the video that has been played.
	 */
	times: function() {
		return {
			formattedDuration: Helpers.formattedDurationSeconds(this._video.duration),
			formattedCurrentTime: Helpers.formattedDurationSeconds(this._video.currentTime),
			currentTimeSeconds: Math.floor(this._video.currentTime),
			elapsedDurationPercentage: Math.floor((this._video.currentTime / this._video.duration) * 100),
			durationInSeconds: Math.floor(this._video.duration)
		}
	},

	/**
	 *	Function to return the video size
	 *
	 *	@method videoSize
	 *	@return {Object} - an object containing the video size: {width: 640px, height: 480px}
	 */
	videoSize: function() {
		if(this.isLoaded()) {
			return {
				width: this._video.videoWidth,
				height: this._video.videoHeight
			}
		}
	},

	/**
	 *	Function to return a percentage value of the video loaded 
	 *
	 *	@method percentLoaded
	 *	@return {Number} A number between 0 and 100.
	 */
	percentLoaded: function() {
		if(this.isLoaded() && this._video.buffered.length > 0) {
			var bufferedStartTime = this._video.buffered.start(0),
				bufferedEndTime = this._video.buffered.end(0),
				duration = this._video.duration;

				if(bufferedEndTime < duration) {
					return Math.floor((bufferedEndTime / duration) * 100);
				}
				else{
					return 100;
				}
		}
		else {
			return 0;
		}
	},

	/**
	 *	Function to make the video full screen
	 *
	 *	@method goFullScreen
	 *	@return undefined
	 */
	goFullScreen: function() {
		Helpers.videoRequestFullscreen(this._video);
	},

	/**
	 *	Function to unload event listeners and clean up 
	 *	
	 *	@method cleanup
	 *	@return undefined
	 */
	cleanup: function() {
		var self = this;

		_.each(this._events, function(e) {
			self._video.removeEventListener(e.type, e.callback);
		});

		this._events = [];
		this._video = null;

	},

	/**
	 *	Function to set up event listeners for the video player
	 *	
	 *	@method primeEventListeners
	 *	@private
	 *	@param {Object} the jQuery node for the video 
	 *	@return undefined
	 */
	_primeEventListeners: function() {

		var self = this;

		if(typeof this._video === 'undefined') {
			throw {
				error: 'Cannot add event listeners',
				detail: 'The video object is currently set up as ' + (typeof video)
			}
		}
		else {
			_.each(this._events, function(e) {
				self._video.addEventListener(e.type, function(evt) {
					_.throttle(e.callback(), 1000);
				});
			});
		}
	}
};