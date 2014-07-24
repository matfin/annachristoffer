/**
*	Template - views_page
*	Callback called automatically when the template instance is created.
*	@method created
*	@return undefined
*/
Template['views_page'].created = function() {
	App.currentView = 'content';

	console.log(this);
};

/**
*	Template - views_page
*	Callback called automatically when the template instance is created.
*	@method rendered
*	@return undefined
*/
Template['views_page'].rendered = function() {
	$('body').addClass('page');
};

/**
*	Template - views_page
*	Callback called automatically when the template instance is created.
*	@method destroyed
*	@return undefined
*/
Template['views_page'].destroyed = function() {
	$('body').removeClass();
};