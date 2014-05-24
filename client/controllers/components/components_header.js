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

/**
*	Template - components_header
*	Populate content items from the content store.
*	@method contentItems
*	@return undefined
*/
Template['components_header'].contentItems = function() {
	return App.models.content.find({}).fetch();
};

/**
*	Anonymous helper function to set the top position of the header menu on scroll
*	@method positionHeader
*	@return undefined
*/
var positionHeader = Deps.autorun(function() {

	/**
	 *	Run this function each time the viewportScrolledDependency is changed.
	 *	Do not do this for mobile devices.
	 */
	Dependencies.viewportScrollDependency.depend();
	if(!Device.isMobile) {
		$('header').css({
			'top': ($(window).scrollTop() + 160) + 'px'
		});
	}
	else {
		$('header').css({
			'top': '0px'
		});
	}
});

/**
 *	Events for this template
 */
Template['components_header'].events = {
	'click button': function(e, template) {
		if(Device.isTouchCapable) {
			e.preventDefault();
			return;
		}
		else {
			$(template.find('nav')).toggleClass('revealed');
		}
	},
	'touchstart button': function(e, template) {
		$(template.find('nav')).toggleClass('revealed');
	}
};