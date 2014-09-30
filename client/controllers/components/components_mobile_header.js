/**
*	Template - components_mobile_header
*	Callback called automatically when the template instance is created.
*	@method created
*	@return undefined
*/
Template['components_mobile_header'].created = function() {
};

/**
*	Template - components_mobile_header
*	Callback called automatically when the template instance is rendered.
*	@method rendered
*	@return undefined
*/
Template['components_mobile_header'].rendered = function() {
};

/**
*	Template - components_mobile_header
*	Callback called automatically when the template instance is destroyed.
*	@method destroyed
*	@return undefined
*/
Template['components_mobile_header'].destroyed = function() {
	console.log('components_mobile_header destroyed');
};

/**
*	Template - components_mobile_header
*	Populate navigation items from the categories collection
*	@method navCategories
*	@return {Object} - fetched categories result set
*/
Template['components_mobile_header'].navCategories = function() {
	return App.models.categories.find({}).fetch();
};