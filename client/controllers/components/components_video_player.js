/**
*	Template - components_video_player
*	Callback called automatically when the template instance is created.
*	@method created
*	@return undefined
*/
Template['components_video_player'].created = function() {
	console.log(this);
};

/**
*	Template - components_video_player
*	Callback called automatically when the template instance is rendered.
*	@method rendered
*	@return undefined
*/
Template['components_video_player'].rendered = function() {

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

	return Helpers.loadVideoSource(this.video);
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

Template['cards_figcaption'].events = {
	'click video': function(e, template) {
		var video = $(template.find('video'));

		console.log(video);

		video[0].play();
	}
}