/**
*	Template - cards_mobile_project
*	Callback called automatically when the template instance is created.
*	@method created
*	@return undefined
*/
Template['cards_mobile_project'].created = function() {
};

/**
*	Template - cards_mobile_project
*	Callback called automatically when the template instance is created.
*	@method rendered
*	@return undefined
*/
Template['cards_mobile_project'].rendered = function() {	
};

/**
*	Template - cards_mobile_project
*	Callback called automatically when the template instance is created.
*	@method destroyed
*	@return undefined
*/
Template['cards_mobile_project'].destroyed = function() {
};

/**
 *	Template - cards_mobile_project
 *	Helper functions for this template
 */
Template['cards_mobile_project'].helpers({

	/**
	 *	Returns the correct image path for use in the template, in this case the path for the thumbnail
	 */
	thumbnail: function() {

		var thumbnail = _.find(this.contents, function(item) {
			return item.type === 'thumbnail';
		});
		
		if(typeof thumbnail !== 'undefined' && typeof thumbnail.img !== 'undefined') {
			return 'images/projects/' + Helpers.loadImageSource(thumbnail.img, {isThumbnail: true});
		}
		else {
			return false;
		}
	},

	/**
	 *	Function to populate translated slug to be used in
	 *	the iron-router pathFor function
	 */
	translatedSlug: function() {
		var data = Template.currentData(),
			slug = data.slug;

		return UI._globalHelpers.loadMessageCode(slug);
	}

});