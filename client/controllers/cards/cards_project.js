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
	// Dependencies.projectLoadedDependency.changed();
	/**
	 *	Get the card size height, assigning the maximum height to the App attribute.
	 */
	var template = this;
	var templateCardHeight = $(template.find('.projectCard')).outerHeight(true);
	App.cardSizeHeight = templateCardHeight > App.cardSizeHeight ? templateCardHeight:App.cardSizeHeight;
	/**
	 *	Here, each card is checked to see if it has been animated.
	 *	The dependency contained within is automatically run when
	 *	the parent template randomly selectcs a card and animates it
	 *	by giving it the .animated class. 
	 *	The template will check itself and if it is the one that has 
	 *	animated, it will call the funciton below and remove the animated
	 *	state after 2.5 seconds.
	 */
	this.computation = Deps.autorun(function(){
		Dependencies.projectCardAnimatedDependency.depend();
		_.each($(template.find('a.animated')), function(node) {
			template.cardFadeoutTimeout = Meteor.setTimeout(function() {
				$(node).removeClass('animated');
			}, 2500);
		});
	});
};

/**
*	Template - cards_project
*	Callback called automatically when the template instance is created.
*	@method destroyed
*	@return undefined
*/
Template['cards_project'].destroyed = function() {
	clearTimeout(this.cardFadeoutTimeout);
	this.computation.stop();
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
*	@method highlighted
*	@return {String} 'highlighted' if highlighted is true, '' if not.
*/
Template['cards_project'].highlighted = function() {
	return this.highlighted ? 'highlighted':'';
};

/**
*	Template - cards_project
*	Returns a boolean indicating if the card should be highlighted with colour
*	@method colourHighlighted
*	@return {String} 'colourHighlighted' if colourHighlighted is true, '' if not.
*/
Template['cards_project'].colourHighlighted = function() {
	return this.colourHighlighted ? 'colourHighlighted':'';
};

/**
*	Template - cards_project
*	Events for this template
*/
Template['cards_project'].events = {
};
