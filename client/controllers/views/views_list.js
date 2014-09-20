/**
*	Template - views_list
*	Callback called automatically when the template instance is created.
*	@method created
*	@return undefined
*/
Template['views_list'].created = function() {
	App.currentView = 'list';
};

/**
*	Template - views_list
*	Callback called automatically when the template instance is created.
*	@method rendered
*	@return undefined
*/
Template['views_list'].rendered = function() {
	$('body').addClass('list');
};

/**
*	Template - views_list
*	Callback called automatically when the template instance is created.
*	@method destroyed
*	@return undefined
*/
Template['views_list'].destroyed = function() {
	$('body').removeClass('list');

	/**
	 *	Resetting the height of the content section 
	 *	when this view has been destroyed
	 */
	$('.content section').css({
		'height': 'auto'
	});
};

/**
 *	Template - views_list
 *	Function to group project cards according to formations
 *	@method groupedProjectCards
 *	@return {object} - groups containing project cards
 */
Template['views_list'].groupedProjectCards = function() {

	Dependencies.viewportResizeDependency.depend();

	/**
	 * Grab the correct formation
	 */
	var formation,
		groups = [],
		projects = this.projects || [];

	if(Device.isHD) {
		formation = App.models.formations.findOne({"screen": "hd"});
	}
	else if(Device.isDesktop) {
		formation = App.models.formations.findOne({"screen": "desktop"});
	}
	else if(Device.isLaptop) {
		formation = App.models.formations.findOne({"screen": "laptop"});
	}
	else if(Device.isTablet) {
		formation = App.models.formations.findOne({"screen": "tablet"});
	}
	else {
		formation = App.models.formations.findOne({"screen": "mobile"});
	}

	var projectsAdded = 0;

	_.each(formation.cardFormation, function(item, index) {
		
		groups.push({
			paddingTop: item.paddingTop * 176,
			groupWidth: 100 / formation.cardFormation.length,
			projects: projects.slice(projectsAdded, (projectsAdded + item.numberToShow))
		});

		projectsAdded += item.numberToShow;

	});

	return groups;

};
