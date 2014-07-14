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
*	@return {Object} containing the elapsed time and overall duration
*/
Template['components_video_player'].videoTime = function() {

	/**
	 *	This will be called when the browser has loaded the video
	 */
	Dependencies.videoLoadedDataDependency.depend();

	var template = this,
		formattedDuration = '0:00',
		formattedCurrentTime = '0:00';

	if(	typeof template.video !== 'undefined' 
		&& typeof template.video.duration !== 'undefined' 
		&& typeof template.video.currentTime !== 'undefined') {

		formattedDuration = Helpers.formattedDurationSeconds(template.video.duration);
		formattedCurrentTime = Helpers.formattedDurationSeconds(template.video.currentTime);
	}

	return {
		duration: formattedDuration,
		currentTime: formattedCurrentTime
	}
};

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

	'loadeddata video': function(e, template) {
		Dependencies.videoLoadedDataDependency.changed();
	},

	'timeupdate video': function(e, template) {
		console.log('timeupdate video');
	}
}