/**
 *	Template - components_video_player
 *	Callback called automatically when the template instance is created.
 *	@method created
 *	@return undefined
 */
Template['components_video_player'].created = function() {
};

/**
 *	Template - components_video_player
 *	Callback called automatically when the template instance is rendered.
 *	@method rendered
 *	@return undefined
 */
Template['components_video_player'].rendered = function() {

	var template = this;

	var events = [
		{
			type: 'loadeddata', 
			callback: function() {
			}
		},
		{
			type: 'progress', 
			callback: function() {
				Dependencies.videoLoadedDependency.changed();
				// console.log('Progress callback happening');
			} 
		},
		{
			type: 'timeupdate', 
			callback: function() {
				Dependencies.videoTimeDependency.changed();
				// console.log('Timeupdate callback happening.');
			} 
		}
	];

	Video.setup($(template.find('video')), events);
};

/**
 *	Template - components_video_player
 *	Callback called automatically when the template instance is destroyed.
 *	@method destroyed
 *	@return undefined
 */
Template['components_video_player'].destroyed = function() {
	Video.cleanup();
};

/**
 *	Template - components_video_player
 *	Helper function to return the correctly sized video
 *	@method videoSource
 *	@return {String}
 */
Template['components_video_player'].videoSource = function() {

	// Call this automatically on window resize
	Dependencies.viewportResizeDependency.depend();

	return Helpers.loadVideoSource(this.videoUrl);
};

/**
 *	Template - components_video_player
 *	Helper function to return the correctly sized image
 *	@method imgSource
 *	@return {String}
 */
Template['components_video_player'].imgSource = function() {

	// Call this automatically on window resize
	Dependencies.viewportResizeDependency.depend();

	return Helpers.loadImageSource(this.img);
};

/**
 *	Tenplate - components_video_player
 *	Helper function to return video times (duration, currently playing etc)
 *	@method videoTime
 *	@return {Object}
 */
Template['components_video_player'].videoTime = function() {

	Dependencies.videoTimeDependency.depend();

	if(Video.isLoaded()) {

		var times = Video.times();

		return {
			currentTime: times.formattedCurrentTime,
			duration: times.formattedDuration,
			durationPercentage: times.elapsedDurationPercentage
		}
	}
	else {
		return {
			currentTime: '0:00',
			duration: 'TBC',
			durationPercentage: 0
		}
	}
};

/**
 *	Tenplate - components_video_player
 *	Helper function to return the percentage of the video that has loaded
 *	@method videoLoadedPercentage
 *	@return {Number}
 */
Template['components_video_player'].videoLoadedPercentage = function() {

	Dependencies.videoLoadedDependency.depend();
	return Video.percentLoaded();

};

/**
 *	Template - components_video_player
 *	Events	
 */
Template['components_video_player'].events = {

	'click .playcontrol': function(e, template) {

		if(Video.paused()) {
			Video.play();
		}
		else {
			Video.pause();
		}
	},

	'click .muteButton': function(e, template) {

		if(Video.muted()) {
			Video.unmute();
		}
		else {
			Video.mute()
		}
	},

	'click .fullscreenToggle': function(e, template) {
		Video.goFullScreen();
	}	
}

