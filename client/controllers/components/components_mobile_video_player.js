/**
 *	Template - components_mobile_video_player
 *	Callback called automatically when the template instance is created.
 *	@method created
 *	@return undefined
 */
Template['components_mobile_video_player'].created = function() {
};

/**
 *	Template - components_mobile_video_player
 *	Callback called automatically when the template instance is rendered.
 *	@method rendered
 *	@return undefined
 */
Template['components_mobile_video_player'].rendered = function() {
};

/**
 *	Template - components_mobile_video_player
 *	Callback called automatically when the template instance is destroyed.
 *	@method destroyed
 *	@return undefined
 */
Template['components_mobile_video_player'].destroyed = function() {
};

/**
 *	Template - views_list
 *	Helper functions for this template
 */
Template['components_mobile_video_player'].helpers({

	/**
	 *	Helper function to return the correctly sized video	
	 */
	videoSource: function() {
		return Helpers.loadVideoSource(this.videoUrl);
	},

	/**
	 *	Helper function to return the correctly sized image
	 */
	imgSource: function() {
		return Helpers.loadImageSource(this.img);
	}

});

/**
 *	Template - components_video_player
 *	Events	
 */
Template['components_mobile_video_player'].events = {
}

