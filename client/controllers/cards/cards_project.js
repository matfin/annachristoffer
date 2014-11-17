/**
*	Template - cards_project
*	Callback called automatically when the template instance is created.
*	@method created
*	@return undefined
*/
Template['cards_project'].created = function() {
};

/**
*	Template - cards_project
*	Callback called automatically when the template instance is created.
*	@method rendered
*	@return undefined
*/
Template['cards_project'].rendered = function() {
	
	var template = this,
		placementIndex = this.$('.projectCard').parent().index();

	Meteor.setTimeout(function() {
		template.$('.projectCard').addClass('rendered');
	}, 200 * (placementIndex + 1));
	
};

/**
*	Template - cards_project
*	Callback called automatically when the template instance is created.
*	@method destroyed
*	@return undefined
*/
Template['cards_project'].destroyed = function() {
	this.$('.projectCard').removeClass('rendered');
	this.$('.projectCard').removeClass('faded');
	this.$('.projectCard').removeClass('highlighted');
};

/**
 *	Template - cards_project_mobile
 *	Helper functions for this template
 */
Template['cards_project'].helpers({

	/**
	 *	Helper to return the category ids concatenated into a String
	 */
	categories: function() {
		return _.map(this.category_ids, function(category_id){
			return category_id.id;
		}).join(',');
	},

	/**
	 *	Determines if the project has a thumbnail image.
	 */
	hasThumbnail: function() {
		var thumbnail = _.find(this.contents, function(item) {
			return item.type === 'thumbnail';
		});
		return (typeof thumbnail !== 'undefined' && typeof thumbnail.img !== 'undefined');
	},

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
	 *	Returns a boolean indicating if the card should be highlighted
	 */
	colourHighlighted: function() {
		/**
		 * Card highlight and fade effect only if a category is specified.
		 */
		if(App.currentView.id) {
			var isHighlighted = _.find(this.category_ids, function(category_id){
				return category_id.id === App.currentView.id;
			});
			return isHighlighted ? 'colourhighlighted':'faded';
		}
		else return '';
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
