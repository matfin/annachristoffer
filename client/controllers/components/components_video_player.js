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
	this.video = this.data.video = $(template.find('video')).get(0);
};

/**
*	Template - components_video_player
*	Callback called automatically when the template instance is destroyed.
*	@method destroyed
*	@return undefined
*/
Template['components_video_player'].destroyed = function() {

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
*	Helper function to return the video duration and elapsed time
*	@method time
*	@return {Object} containing the elapsed time, overall duration and duration played as a percentage
*/
Template['components_video_player'].videoTime = function() {

	/**
	 *	This will be called when the browser has loaded the video
	 */
	Dependencies.videoEventDependency.depend();

	var template = this,
		formattedDuration = '0:00',
		formattedCurrentTime = '0:00',
		elapsedDurationPercentage = 0;

	if(	typeof template.video !== 'undefined' 
		&& typeof template.video.duration !== 'undefined' 
		&& typeof template.video.currentTime !== 'undefined') {

		formattedDuration = Helpers.formattedDurationSeconds(template.video.duration);
		formattedCurrentTime = Helpers.formattedDurationSeconds(template.video.currentTime);
		elapsedDurationPercentage = Math.floor((template.video.currentTime / template.video.duration) * 100);
	}

	return {
		durationPercentage: elapsedDurationPercentage,
		duration: formattedDuration,
		currentTime: formattedCurrentTime
	}
};

/**
 *	Function updateVideoLoadProgress
 *	Update a given dom element with a percentage value representing the video stream loaded
 *	@param {Object} the template
 *	@return undefined
 */
var updateVideoLoadProgress = function(template) {
	if(template.video.buffered.length > 0) {
		var bufferedStartTime = template.video.buffered.start(0),
			bufferedEndTime = template.video.buffered.end(template.video.buffered.length - 1),
			duration = template.video.duration,
			bufferedPercentage = Math.floor((bufferedEndTime / duration) * 100);

		$(template.find('.loadingProgressIndicator')).css({
			'width': bufferedPercentage + '%'
		})
	}
}

/**
 *	Template - components_video_player
 *	Events	
 */
Template['components_video_player'].events = {
	'click .playcontrol': function(e, template) {
		if(template.video.paused) {
			template.video.play();
		}
		else {
			template.video.pause();
		}
	},

	'click .muteButton': function(e, template) {
		if(template.video.muted) {
			template.video.muted = false;
		}
		else {
			template.video.muted = true;
		}
	},

	'click .fullscreenToggle': function(e, template) {
		console.log('Go fullscreen');
		Helpers.videoRequestFullscreen(template.video);
	},

	'loadeddata video': function(e, template) {
		Dependencies.videoEventDependency.changed();
	},

	'timeupdate video': function(e, template) {
		Dependencies.videoEventDependency.changed();
	},

	'durationchange video': function(e, template){
	
	},

	'progress video': function(e, template) {
		updateVideoLoadProgress(template);
	}
}