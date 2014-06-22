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
	var template = this;

	/**
	 *	Anonymous function to fire off the card animation process
	 *	only when all the cards have been rendered fully.
	 */
	if(!Device.isMobile) {
		(function() {
			var deferred = Helpers.promise.defer();

			var interval = Meteor.setInterval(function() {
				if($('.projectCard').length === App.models.projects.find({}).count()) {
				 	deferred.resolve();
				 	Meteor.clearInterval(interval);
				 	return;
				}
			}, 500);

			return deferred.promise;

		})().then(function() {
			
			Meteor.setInterval(function() {
				Helpers.randomlySelectProjectCard().addClass('animated');
			}, 2500);

		});
	}
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

	/**
	 *	Fetch projects grouped by highlighted and add an index for each one
	 *	to ensure they appear in the correct formation.
	 */
	var projects = App.models.projects.find({}, {sort: {highlighted: -1}}).fetch();
	_.each(projects, function(project, index) {
		project.index = index + 1;
	});

	Dependencies.projectLoadedDependency.changed();

	return projects;
};

/**

	if($('.projectCard').length === App.models.projects.find({}).count()) {
		console.log('All project cards loaded');
		console.log(App.models.projects.find({}).count(), $('.projectCard').length);
	}
**/

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
	Dependencies.projectLoadedDependency.depend();
	var formation = false;

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

	if($('.projectCard').length !== 0 && formation) {

		/**
 		 *	Setting the card width so they line up nicely
 		 *	from within the content section
		 */

		var cardFormation = formation.cardFormation;

		var cardSizeWidth = ($('section').outerWidth() - (cardFormation.length * 16)) / cardFormation.length;

		var cardSize = {
			width: cardSizeWidth,
			height: $('.projectCard').outerHeight()
		};

		var cardIndex = 0;
		var maxFormationHeight = 0;

		/**
		 *	Then place them in formation
		 */
		_.each(cardFormation, function(item, index) {

			var formationHeight = 0;

			for(var i = 0; i < item.numberToShow; i++) {
				
				if(Device.isMobile) {

					$('.projectCard').eq(cardIndex).transition({
						x: 0,
						y: 0
					});

					$('.projectCard').eq(cardIndex).css({
						'width': '100%',
						'left': '0px',
						'top': '0px',
						'position': 'relative'
					});

					formationHeight =+ ((cardSize.height) * i);

				}
				else {
					/**
					 *	Experimenting with CSS3 transitions.
					 */
					$('.projectCard').eq(cardIndex).css({
						'width': cardSizeWidth + 'px',
						'position': 'absolute'
					});
					$('.projectCard').eq(cardIndex).transition({
						x: ((cardSize.width + 16) * index + 16),
						y: ((cardSize.height + 16) * i) + ((cardSize.height + 16) * item.paddingTop)
					});

					formationHeight =+ ((cardSize.height + 16) * i) + ((cardSize.height + 16) * item.paddingTop);
				}

				cardIndex++;
			}

			maxFormationHeight = (formationHeight > maxFormationHeight) ? formationHeight:maxFormationHeight;

		});

		// Setting the height of the content section, container and wrapper
		$('.wrapper, .content section').css({
			'min-height': maxFormationHeight + cardSize.height + 'px'
		});
		$('body').css({
			'min-height': maxFormationHeight + cardSize.height + 48 + 'px'
		})
	}
});
