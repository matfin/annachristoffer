/**
*	Template - views_content
*	Callback called automatically when the template instance is created.
*	@method created
*	@return undefined
*/
Template['views_content'].created = function() {
	App.currentView = 'content';
};

/**
*	Template - views_content
*	Callback called automatically when the template instance is created.
*	@method rendered
*	@return undefined
*/
Template['views_content'].rendered = function() {
	$('body').addClass('content');
};

/**
*	Template - views_content
*	Callback called automatically when the template instance is created.
*	@method destroyed
*	@return undefined
*/
Template['views_content'].destroyed = function() {
	$('body').removeClass();
};