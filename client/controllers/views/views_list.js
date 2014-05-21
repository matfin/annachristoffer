/**
*	Template - views_list
*	Callback called automatically when the template instance is created.
*	@method created
*	@return undefined
*/
Template['views_list'].created = function() {
	/**
	 *	Let the template know how many projects we have 
	 *	This is used to determine if all child templates 
	 *	have loaded.
	 */
};

/**
*	Template - views_list
*	Callback called automatically when the template instance is created.
*	@method rendered
*	@return undefined
*/
Template['views_list'].rendered = function() {
	$('.wrapper').addClass('list');
};

/**
*	Template - views_list
*	Callback called automatically when the template instance is created.
*	@method destroyed
*	@return undefined
*/
Template['views_list'].destroyed = function() {
	$('.wrapper').removeClass('list');
};

/**
*	Template - views_list
*	Helper function to populate categorised projects
*	@method projects
*	@return {Object}	Meteor.Collection
*/
Template['views_list'].projects = function() {
	var category = App.models.categories.findOne({slug: this._category_slug});
	var project;

	if(typeof category !== 'undefined') {
		return App.models.projects.find({ 'category_ids.id': category.id}).fetch();
	}
	else {
		return App.models.projects.find({}).fetch();
	}
};

/**
*	Anonymous helper function to rearragne the project cards using DOM man
*	@method arrangeCards
*	@return undefined
*/
var arrangeCards = Deps.autorun(function() {
	/**
	 *	Each time these dependency is changed, 
	 *	this function will be called.
	 */

	Dependencies.viewportResizeDependency.depend();
	Dependencies.projectsLoadedDependency.depend();
	var cardFormation = false;

	if(Device.isDesktop) {
		cardFormation = [
			{
				paddingTop: 1,
				numberToShow: 2
			},
			{
				paddingTop: 0.5,
				numberToShow: 3
			},
			{
				paddingTop: 0,
				numberToShow: 4
			},
			{
				paddingTop: 0.5,
				numberToShow: 2
			}
		];
	}
	else if(Device.isLaptop) {
		cardFormation = [
			{
				paddingTop: 0.5,
				numberToShow: 3
			},
			{
				paddingTop: 0.0,
				numberToShow: 5
			},
			{
				paddingTop: 0.5,
				numberToShow: 3
			},
		];
	}
	else if(Device.isTablet) {
		cardFormation = [
			{
				paddingTop: 0,
				numberToShow: 6
			},
			{
				paddingTop: 0.5,
				numberToShow: 5
			},
		];
	}


	if($('.projectCard').length !== 0 && cardFormation) {

		var cardSize = {
			width: $('.projectCard').outerWidth(),
			height: $('.projectCard').outerHeight()
		};

		var cardIndex = 0;
		var maxFormationHeight = 0;

		_.each(cardFormation, function(item, index) {

			var formationHeight = 0;

			for(var i = 0; i < item.numberToShow; i++) {
				
				$('.projectCard').get(cardIndex).style.top = ((cardSize.height + 16) * i) + ((cardSize.height + 16) * item.paddingTop) + 'px';
				$('.projectCard').get(cardIndex).style.right = ((cardSize.width + 16) * index) + 'px';

				formationHeight =+ ((cardSize.height + 16) * i) + ((cardSize.height + 16) * item.paddingTop);

				cardIndex++;
			}

			maxFormationHeight = (formationHeight > maxFormationHeight) ? formationHeight:maxFormationHeight;

		});

		// Setting the height of the content section
		$('.content section').css({
			'height': maxFormationHeight + (cardSize.height * 2) + 'px'
		});
	}
});
