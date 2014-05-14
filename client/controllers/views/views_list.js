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
*	@method destroyed
*	@return undefined
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