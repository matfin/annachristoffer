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

	/**
	 *	Kick off the arrangeCards Tracker computation.
	 */

	this.arrangeCardsComputation = Tracker.autorun(function() {
		Dependencies.viewportResizeDependency.depend();
		Dependencies.projectLoadedDependency.depend();
		arrangeCards();
	});
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
	
	/** 
	 *	Stop the arrangeCards Deps computation
	 */
	this.arrangeCardsComputation.stop();
};

/**
*	Anonymous helper function to rearragne the project cards using DOM man
*	@method arrangeCards
*	@return undefined
*/
var arrangeCards = function() {
	/**
	 *	Each time these dependency is changed, 
	 *	this function will be called.
	 */

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

		var cardIndex = 0;
		var maxFormationHeight = 0;

		/**
		 *	Then place them in formation
		 */
		_.each(cardFormation, function(item, index) {

			var formationHeight = 0;

			for(var i = 0; i < item.numberToShow; i++) {
				
				if(Device.isMobile) {

					$('.projectCard').eq(cardIndex).velocity({
						translateX: 0,
						translateY: 0
					});

					$('.projectCard').eq(cardIndex).css({
						'width': '100%',
						'left': '0px',
						'top': '0px',
						'position': 'relative'
					});

					formationHeight =+ ((cardSizeHeight) * i);

				}
				else {
					/**
					 *	Complete the transition using velocity.js
					 */

					var cardSizeHeight = $('.projectCard').eq(cardIndex).outerHeight(true);

					$('.projectCard').eq(cardIndex).velocity({
						width: Math.floor(cardSizeWidth) + 'px',
						translateX: Math.floor(((cardSizeWidth + 16) * index + 16)) + 'px',
						translateY: Math.floor(((cardSizeHeight + 16) * i) + ((cardSizeHeight) * item.paddingTop))
					});

					$('.projectCard').eq(cardIndex).css({
						position: 'absolute'
					});

					formationHeight =+ ((cardSizeHeight + 16) * i) + ((cardSizeHeight + 16) * item.paddingTop);
				}

				cardIndex++;
			}

			maxFormationHeight = (formationHeight > maxFormationHeight) ? formationHeight:maxFormationHeight;

		});

		// Setting the height of the content section, container and wrapper
		$('.wrapper, .content section').css({
			'min-height': maxFormationHeight + 160 + 'px'
		});
		$('body').css({
			'min-height': maxFormationHeight + 160 + 'px'
		});
	}
};
