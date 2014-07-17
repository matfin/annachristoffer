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
				console.log('loadeddata');
			}
		},
		{
			type: 'progress', 
			callback: function() {
				console.log('progress');
			} 
		},
		{
			type: 'timeupdate', 
			callback: function() {
				console.log('timeupdate');
			} 
		}
	];

	VideoPlayer.setup($(template.find('video')), events);
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
 *	Events	
 */
Template['components_video_player'].events = {
	'click .playcontrol': function(e, template) {

		VideoPlayer.playPauseToggle();

		// if(template.video.paused) {
		// 	template.video.play();
		// }
		// else {
		// 	template.video.pause();
		// }
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
		Helpers.videoRequestFullscreen(template.video);
	}
}

