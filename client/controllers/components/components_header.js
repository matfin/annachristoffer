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
*	@return {Object} - fetched categories result set
*/
Template['components_header'].navCategories = function() {
	return App.models.categories.find({}).fetch();
};

/**
*	Template - components_header
*	Populate pages from the pages collection.
*	@method pages
*	@return {Object} - fetched categories result set
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
Template['components_header'].staticContent = function() {
	var content = {
		// mainHeading: App.models.staticContent.findOne({slug: 'subtitle'}).content,
		// subtitle: App.models.staticContent.findOne({slug: 'subtitle'}).content,
		// projects: 
		mainHeading: App.models.staticContent.findOne({slug: 'title'}),
		subtitle: App.models.staticContent.findOne({slug: 'subtitle'}),
		projects: App.models.staticContent.findOne({slug: 'projects'})
	};
	return content;
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
	if(!Device.isMobile && (App.currentView === 'detail' || App.currentView === 'page')) {
		
		$('header').css({
			'top': ($(window).scrollTop()) + 64 + 'px'
		});

	}
	else {

		$('header').css({
			'top': '0px'
		});

	}
});