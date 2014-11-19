/**
 *	Template - views_mobile_page
 *	Callback called automatically when the template instance is created.
 *	@method created
 *	@return undefined
 */
Template['views_mobile_page'].created = function() {
};

/**
 *	Template - views_mobile_page
 *	Callback called automatically when the template instance is created.
 *	@method rendered
 *	@return undefined
 */
Template['views_mobile_page'].rendered = function() {
	$('body').addClass('page');
};

/**
 *	Template - views_mobile_page
 *	Callback called automatically when the template instance is created.
 *	@method destroyed
 *	@return undefined
 */
Template['views_mobile_page'].destroyed = function() {
	$('body').removeClass();
};

/**
 *	Template - views_mobile_page
 *	Helper functions for this template
 */
Template['views_mobile_page'].helpers({

	/**
 	 *	Helper function to fetch content section by name
 	 */
 	getSectionGroupsByName: function(sectionName) {
 		if(this.sections && typeof this.sections !== 'undefined') {
 			return _.findWhere(this.sections, {name: sectionName}).groups;
 		}

 		return;
 	}

});