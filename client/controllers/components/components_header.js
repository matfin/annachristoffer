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
*	Populate navigation items from the categories collection
*	@method navCategories
*	@return Meteor.Collection
*/
Template['components_header'].navCategories = function() {
	return App.models.categories.find({}).fetch();
};

/**
*	Template - components_header
*	Populate pages from the pages collection.
*	@method pages
*	@return Meteor.Collection
*/
Template['components_header'].pages = function() {
	return App.models.pages.find({}).fetch();
};

/**
*	Template - components_header
*	Populate page content items from the content collection.
*	@method pages
*	@return {Object}
*/
Template['components_header'].content = function() {
	return {
		title: Helpers.loadMessageCode('title'),
		subtitle: Helpers.loadMessageCode('subtitle'),
		workingat: Helpers.loadMessageCode('workingat'),
		projects: Helpers.loadMessageCode('projects'),
	}
};

/**
*	Anonymous helper function to set the top position of the header menu on scroll
*	@method positionHeader
*	@return undefined
*/
var primeHeader = Deps.autorun(function() {
	/**
	 *	Run this function each time the viewportScrolledDependency is changed.
	 *	Do not do this for mobile devices.
	 */
	Dependencies.viewportScrollDependency.depend();
	Dependencies.viewportResizeDependency.depend();

	/**
	 *	For now, the side nav menu should only scroll on a detail page
	 */
	if(!Device.isMobile && App.currentView === 'detail') {
		
		$('header').css({
			'top': ($(window).scrollTop()) + 48 + 'px'
		});

	}
	else {

		$('header').css({
			'top': '0px'
		});

	}
});