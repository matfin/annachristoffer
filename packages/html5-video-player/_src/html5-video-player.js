/**
 *	Controls and event listener for custom html5 based video player
 *	
 *	@class VideoPlayer
 *	@static
 */
VideoPlayer = {

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

	play: function() {
		this._video.play();
	},

	pause: function() {
		this._video.pause();
	},

	stop: function() {
		this._video.stop();
	},

	toggleMute: function() {
		if(this._video.muted) {
			this._video.muted = false;
		}
		else {
			this._video.muted = true;
		}
	},

	paused: function() {
		return this._video.paused;
	},

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

				self._video.addEventListener(e.type, _.throttle(e.callback, 250));

			});
		}
	}
};