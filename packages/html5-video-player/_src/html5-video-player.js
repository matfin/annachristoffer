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
	 *	Video canPlay state
	 *	
	 *	@property _canPlay
	 *	@private
	 *	@type {Boolean}
	 *	@default false
	 */
	_canPlay: false,

	/**
	 *	Function to prime the video player
	 *	
	 *	@method setup
	 *	@param {Object} the jQuery node for the video 
	 *	@param {Array} an optional array containing events with callbacks that need to be made
	 *	@return undefined
	 */
	setup: function(video, events) {

		var self = this,
			deferred = Q.defer();

		if(typeof video !== 'undefined') {
			this._video = video.get(0);
			this._events = events;

			this.checkNetworkState().then(function(status) {
				/** 
				 *	Success, so we can set up event listeners
				 *	to control video playback
				 */
				self._primeEventListeners();
				deferred.resolve({
					status: 'ok',
					message: 'Video set up complete.'
				});

				/** 
				 *	Fail
				 */
			}).fail(function(status) { 
				deferred.reject({
					status: 'fail',
					message: 'Video could not be set up'
				})
			});
		}
		else {
			deferred.reject({
				status: 'fail',
				message: 'It seems the argument passed in for the video did not work.'
			});
		}

		return deferred.promise;
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
	 *	Function which returns a promise when the video readyState is
	 *	NETWORK_LOADED (3)
	 *	
	 *	@method checkReadyState
	 *	@return {Object} - 	a resolved promise if the video readyState 
	 *						has reached 3 within ten seconds, or a 
	 *						rejected promise.
	 */
	checkReadyState: function() {
		var deferred = Q.defer(),
			self = this;

		var checkInterval = Meteor.setInterval(function() {
			/**
			 *	Readystate 1 equates to the constant HAVE_METADATA.
			 *	When we are happy it has loaded, we kill the interval.
			 */
			if(self._video.readyState !== 0) {
				Meteor.clearInterval(checkInterval);
				Meteor.clearTimeout
				deferred.resolve({
					status: true,
					message: 'The metadata was loaded'
				});
			};

		}, 1000);

		var checkTimeout = Meteor.setTimeout(function() {
			Meteor.clearInterval(checkInterval);
			Meteor.clearTimeout(checkTimeout);

			deferred.reject({
				status: false,
				message: 'The metadata was not loaded'
			});
		}, 10000);

		return deferred.promise;
	},

	/**
	 *	Function which returns a promise when the video networkState is
	 *	HAVE_METADATA (1) - Duration and dimensions are available
	 *	is available, so playback could start
	 *	
	 *	@method checkNetworkState
	 *	@return {Object} - 	a resolved promise if the video networkState 
	 *						has reached 1 within ten seconds, or a 
	 *						rejected promise.
	 */
	checkNetworkState: function() {
		var deferred = Q.defer(),
			self = this;

		var checkInterval = Meteor.setInterval(function() {
			/**
			 *	readyState 1 equates to HAVE_METADATA
			 */
			if(self._video.networkState !== 0) {
				Meteor.clearInterval(checkInterval);
				Meteor.clearTimeout
				deferred.resolve({
					status: true,
					message: 'networkState: ' + self._video.networkState
				});
			};

		}, 1000);

		var checkTimeout = Meteor.setTimeout(function() {
			Meteor.clearInterval(checkInterval);
			Meteor.clearTimeout(checkTimeout);

			deferred.reject({
				status: false,
				message: 'networkState: ' + self._video.networkState
			});
		}, 10000);

		return deferred.promise;
	},

	checkVideoCanPlay: function() {
		var deferred = Q.defer(),
			self = this;

		var checkInterval = Meteor.setInterval(function() {

			if(self._canPlay) {
				Meteor.clearInterval(checkInterval);
				Meteor.clearInterval(checkTimeout);

				deferred.resolve({
					status: true,
					message: 'The video can play'
				});
			}
		}, 500);

		var checkTimeout = Meteor.setTimeout(function() {
			Meteor.clearInterval(checkInterval);
			deferred.reject({
				status: false,
				message: 'The video cannot play'
			});
		}, 10000);

		self._video.addEventListener('canplaythrough', function() {
			self._canPlay = true;
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
			_.each(this._events, function(controllerEvent) {
				/**
				 *	Add the event listener defined in controllerEvent.type and execute the callback function
				 *	defined in controllerEvent.callback. The leading and trailing options, set to false, will
				 *	ensure the function only gets called when necessary, and not by default.
				 */
				self._video.addEventListener(controllerEvent.type, _.throttle(controllerEvent.callback, 3000, {trailing: false, leading: false}));
			});
		}
	}
};