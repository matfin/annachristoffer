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
*	Template - cards_project
*	Helper to return a nicely formatted date using moment.js
*	@method formattedDate
*	@param {String}	The date string, which should be in the format "YYYY-MM-DD" ie: "2013-04-26".
*	@param {String} The formatting for the date to be displayed.
*	@return {String} The formatted date
*/
Template['cards_project'].formattedDate = function(dateString, dateFormat) {
	var m = moment(dateString);
	return m.isValid() ? m.format(dateFormat):dateString; 
};

/**
*	Template - cards_project
*	Helper to return the category ids concatednated into a String
*	@method categories
*	@return {String} A comma separated string of category ids
*/
Template['cards_project'].categories = function() {
	return _.map(this.category_ids, function(category_id){
		return category_id.id;
	}).join(',');
};

/**
*	Template - cards_project
*	Determines if the project has a thumbnail image.
*	@method hasThumbnail
*	@return {Booleab} true if a thumbnail has been found, or false if not.	
*/
Template['cards_project'].hasThumbnail = function() {

	var thumbnail = _.find(this.contents, function(item) {
		return item.type === 'thumbnail';
	});
	
	return (typeof thumbnail !== 'undefined' && typeof thumbnail.img !== 'undefined');
	
};

/**
*	Template - cards_project
*	Returns the correct image path for use in the template, in this case the path for the thumbnail
*	@method thumbnail
*	@return {String}	The path for the thumbnail image.
*/
Template['cards_project'].thumbnail = function() {

	var thumbnail = _.find(this.contents, function(item) {
		return item.type === 'thumbnail';
	});
	
	if(typeof thumbnail !== 'undefined' && typeof thumbnail.img !== 'undefined') {
		return 'images/projects/' + Helpers.loadImageSource(thumbnail.img, {isThumbnail: true});
	}
	else {
		return false;
	}
};

/**
*	Template - cards_project
*	Returns a boolean indicating if the card should be highlighted
*	@method colourHighlighted
*	@return {String} 'colourhighlighted' if highlighted is true, '' if not.
*/
Template['cards_project'].colourHighlighted = function() {

	/**
	 * Card highlight and fade effect only if a category is specified.
	 */
	if(App.currentCategoryId) {
		var isHighlighted = _.find(this.category_ids, function(category_id){
			return category_id.id === App.currentCategoryId;
		});
		return isHighlighted ? 'colourhighlighted':'faded';
	}
	else return '';
};

/**
 *	Template - components_header
 *	Helper functions for this template
 */
Template['cards_project'].helpers({

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

/**
*	Template - cards_project
*	Events for this template
*/
Template['cards_project'].events = {
};
