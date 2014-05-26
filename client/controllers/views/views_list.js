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
*	Helper function to populate all projects
*	@method projects
*	@return {Object}	Meteor.Collection
*/
Template['views_list'].projects = function() {
	var category = App.models.categories.findOne({slug: this._category_slug});

	if(typeof category !== 'undefined') {
		App.models.projects.update(
			{'category_ids.id': category.id}, 
			{$set: { highlighted: true }}, 
			{multi: true}
		);
		App.models.projects.update(
			{'category_ids.id': { $not: category.id}}, 
			{$set: { highlighted: false }}, 
			{multi: true}
		);
	}
	else {
		App.models.projects.update(
			{}, 
			{$set: { highlighted: true }}, 
			{multi: true}
		);
	}

	return App.models.projects.find({}, {sort: {highlighted: 1}}).fetch();
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

	if(Device.isHD) {
		cardFormation = [
			{
				paddingTop: 0,
				numberToShow: 3
			},
			{
				paddingTop: 0.5,
				numberToShow: 2
			},
			{
				paddingTop: 0,
				numberToShow: 3
			},
			{
				paddingTop: 0.5,
				numberToShow: 2
			},
			{
				paddingTop: 1,
				numberToShow: 1
			},
		];
	}
	else if(Device.isDesktop) {
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
	else {
		cardFormation = [
			{
				paddingTop: 0,
				numberToShow: 11
			}
		];
	}

	if($('.projectCard').length !== 0 && cardFormation) {

		/**
 		 *	Setting the card width so they line up nicely
 		 *	from within the content section
		 */

		var cardSizeWidth = ($('section').outerWidth() - (cardFormation.length * 16)) / cardFormation.length;

		var cardSize = {
			width: cardSizeWidth,
			height: $('.projectCard').outerHeight()
		};

		var cardIndex = 0;
		var maxFormationHeight = 0;

		_.each(cardFormation, function(item, index) {

			var formationHeight = 0;

			for(var i = 0; i < item.numberToShow; i++) {
				
				$('.projectCard').get(cardIndex).style.top = ((cardSize.height + 16) * i) + ((cardSize.height + 16) * item.paddingTop) + 'px';
				$('.projectCard').get(cardIndex).style.right = ((cardSize.width + 16) * index) + 'px';
				
				if(Device.isMobile) {
					$('.projectCard').get(cardIndex).style.width = '100%';
				}
				else {
					$('.projectCard').get(cardIndex).style.width = cardSizeWidth + 'px';
				}

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
