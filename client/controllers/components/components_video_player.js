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
			type: 'progress',
			interval: 1000, 
			callback: function() {
				Dependencies.videoLoadedDependency.changed();
			} 
		},
		{
			type: 'timeupdate', 
			interval: 500,
			callback: function() {
				Dependencies.videoTimeDependency.changed();
			} 
		},
		{
			type: 'ended',
			interval: 1000,
			callback: function() {
				console.log('The video has ended');
			}
		}
	];

	Video.setup($(template.find('video')), events).then(function() {
		console.log('Video player reports all is good.');
	}).fail(function() {
		console.log('No luck setting this video up.');
	});

	/**
	 *	Set the video height according to the width - fix for iOS Safari.
	 */
	if(Device.isTablet || Device.isMobile) {

		(function() {
			var video = $(template.find('video'));
			var	width = video.outerWidth();
			video.css({
				height: width * 0.75
			});
		})();
	}
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
 *	Template - components_video_player
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
			currentTimeSeconds: times.currentTimeSeconds,
			durationPercentage: times.elapsedDurationPercentage,
			durationInSeconds: times.durationInSeconds
		}
	}
	else {
		return {
			durationPercentage: 0
		}
	}
};

/**
 *	Template - components_video_player
 *	Helper function to return the percentage of the video that has loaded
 *	@method videoLoadedPercentage
 *	@return {Number}
 */
Template['components_video_player'].videoLoadedPercentage = function() {

	Dependencies.videoLoadedDependency.depend();
	return Video.percentLoaded();

};

/**
 *	Function to calculate percentage based on timeline click
 *	to know where to place the timeline indicator.
 *	@method getTimelineOffsetPercentage
 *	@param {Object} clickEvent - the click event
 *	@param {Object} template - the current template
 *	@return {Number} - percentage value of X coordinate clicked on timeline
 */
var getTimelineOffsetPercentage = function(clickEvent, template) {
	var timelineContainerWidth = $(template.find('.timeline-container')).outerWidth();
	
	return (clickEvent.offsetX / timelineContainerWidth) * 100;
};

/**
 *	Template - components_video_player
 *	Events	
 */
Template['components_video_player'].events = {

	'mouseout .mediaContainer': function(e, template) {
		console.log('Mouse out of video player');
	},

	'click .playcontrol': function(e, template) {

		if(Video.paused()) {
			Video.play();
			$(e.target).removeClass('icon-play').addClass('icon-pause');
		}
		else {
			Video.pause();
			$(e.target).removeClass('icon-pause').addClass('icon-play');
		}
	},

	'click .muteButton': function(e, template) {

		if(Video.muted()) {
			Video.unmute();
			$(e.target).removeClass('icon-unmute').addClass('icon-mute');
		}
		else {
			Video.mute();
			$(e.target).removeClass('icon-mute').addClass('icon-unmute');
		}
	},

	'click .timeline-container': function(e, template) {
		
		var timelineOffsetPercentage = getTimelineOffsetPercentage(e, template),
			totalVideoDuration = Video.times().durationInSeconds,
			skipToTime = Math.round(totalVideoDuration * (timelineOffsetPercentage / 100));

		Video.seekTo(skipToTime);

		$(template.find('.timeline-indicator')).css({
			'left': getTimelineOffsetPercentage(e, template) + '%'
		});
	},

	'click .fullscreen-toggle': function(e, template) {
		Video.goFullScreen();
	}	
}

