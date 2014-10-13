/**
*	Template - views_mobile_list
*	Callback called automatically when the template instance is created.
*	@method created
*	@return undefined
*/
Template['views_mobile_list'].created = function() {
	App.currentView = 'list';
};

/**
*	Template - views_mobile_list
*	Callback called automatically when the template instance is created.
*	@method rendered
*	@return undefined
*/
Template['views_mobile_list'].rendered = function() {
	$('body').addClass('list');
};

/**
*	Template - views_mobile_list
*	Callback called automatically when the template instance is created.
*	@method destroyed
*	@return undefined
*/
Template['views_mobile_list'].destroyed = function() {
	$('body').removeClass('list');
};