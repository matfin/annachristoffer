/**
*	Template - components_header
*	Callback called automatically when the template instance is created.
*	@method created
*	@return undefined
*/
Template['components_header'].created = function() {
};

/**
*	Template - components_header
*	Callback called automatically when the template instance is rendered.
*	@method rendered
*	@return undefined
*/
Template['components_header'].rendered = function() {

};

/**
*	Template - components_header
*	Callback called automatically when the template instance is destroyed.
*	@method destroyed
*	@return undefined
*/
Template['components_header'].destroyed = function() {

};

/**
*	Template - components_header
*	Populate navigation items from the categories store
*	@method navCategories
*	@return undefined
*/
Template['components_header'].navCategories = function() {
	return App.models.categories.find({}).fetch();
};