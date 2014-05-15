/**
*	Template - views_list
*	Callback called automatically when the template instance is created.
*	@method created
*	@return undefined
*/
Template['views_list'].created = function() {
	
};

/**
*	Template - views_list
*	Callback called automatically when the template instance is created.
*	@method rendered
*	@return undefined
*/
Template['views_list'].rendered = function() {
	$('body').addClass('list');
};

/**
*	Template - views_list
*	Callback called automatically when the template instance is created.
*	@method destroyed
*	@return undefined
*/
Template['views_list'].destroyed = function() {
	$('body').removeClass('list');
};

/**
*	Template - views_list
*	Helper function to populate categorised projects
*	@method projects
*	@return {Object}	Meteor.Collection
*/
Template['views_list'].projects = function() {
	var category = App.models.categories.findOne({slug: this._category_slug});

	if(typeof category !== 'undefined') {
		return App.models.projects.find({ 'category_ids.id': category.id}).fetch();
	}
	else {
		return App.models.projects.find({}).fetch();
	}
};

/**
*	Anonymous helper function to rearragne the project cards using DOM man
*	@method arrangeCards
*	@return undefined
*/
var arrangeCards = Deps.autorun(function() {
	/**
	 *	Each time this dependency is changed, 
	 *	this function will be called.
	 */
	Dependencies.viewportResizeDependency.depend();
	var cardFormation = [2, 4, 3, 2];
	var cardSize = {
		width: $('.projectCard').outerWidth(),
		height: $('.projectCard').outerHeight()
	};

	console.log(cardSize);
});
