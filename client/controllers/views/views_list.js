/**
*	Template - views_list
*	Callback called automatically when the template instance is created.
*	@method created
*	@return undefined
*/
Template['views_list'].created = function() {
	
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
};

/**
*	Template - views_list
*	Helper function to populate categorised projects
*	@method projects
*	@return {Object}	Meteor.Collection
*/
Template['views_list'].projects = function() {
	var category = App.models.categories.findOne({slug: this._category_slug});

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
	 *	Each time this dependency is changed, 
	 *	this function will be called.
	 */
	Dependencies.viewportResizeDependency.depend();
	var cardFormation = [2, 4, 3, 2];

	if($('.projectCard').length !== 0) {

		var cardSize = {
			width: $('.projectCard').outerWidth(),
			height: $('.projectCard').outerHeight()
		};
		var cardIndex = 0;

		_.each(cardFormation, function(num, index) {
			console.log('Test: ', num, index, cardSize);
			for(var i = 0; i < num; i++) {
				console.log($('.projectCard').get(cardIndex));
				$('.projectCard').get(cardIndex).style.top = ((cardSize.height * i) + 0) + 'px';
				$('.projectCard').get(cardIndex).style.left = ((cardSize.width * index) + 0) + 'px';
				cardIndex++;
			}
		});
	}
});
