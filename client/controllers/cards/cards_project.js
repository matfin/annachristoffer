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

	Dependencies.projectLoadedDependency.changed();
	var template = this;
	var count = App.models.projects.find({}).count();
	var intervaltime = (Math.floor(Math.random() * count) + 1) * 500;

	this.intervalFadeIn = Meteor.setTimeout(function() {
		$(template.find('a')).css({
			'color': 'red'
		});
	}, intervaltime);

	this.intervalFadeOut = Meteor.setTimeout(function() {
		$(template.find('a')).css({
			'color': 'inherit'
		});
	}, intervaltime + 15000);

};

/**
*	Template - cards_project
*	Callback called automatically when the template instance is created.
*	@method destroyed
*	@return undefined
*/
Template['cards_project'].destroyed = function() {
	Meteor.clearInterval(this.intervalFadeIn);
	Meteor.clearInterval(this.intervalFadeOut);
};

/**
*	Template - cards_project
*	Helper to return a nicely formatted date using moment.js
*	@method formattedDate
*	@param {String}	The date string, which should be in the format "YYYY-MM-DD" ie: "2013-04-26".
*	@param {String} The formatting for the date to be displayed.
*	@return undefined
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
*	Returns a boolean indicating if the card should be highlighted
*	@method highlighted
*	@return {String} 'highlighted' if highlighted is true, '' if not.
*/
Template['cards_project'].highlighted = function() {
	return this.highlighted ? 'highlighted':'';
};
