/**
*	Template - views_detail
*	Callback called automatically when the template instance is created.
*	@method created
*	@return undefined
*/
Template['views_detail'].created = function() {
};

/**
*	Template - views_detail
*	Callback called automatically when the template instance is created.
*	@method rendered
*	@return undefined
*/
Template['views_detail'].rendered = function() {
	$('.wrapper').addClass('detail');
};

/**
*	Template - views_detail
*	Callback called automatically when the template instance is created.
*	@method destroyed
*	@return undefined
*/
Template['views_detail'].destroyed = function() {
	$('.wrapper').removeClass('detail');
};

/**
*	Template - views_detail
*	Helper function to return the template data
*	@method projectData
*	@return {Object} the project data
*/
Template['views_detail'].projectData = function() {
	return App.models.projects.findOne({'slug': this._project_slug});
};