/**
*	Template - views_page
*	Callback called automatically when the template instance is created.
*	@method created
*	@return undefined
*/
Template['views_page'].created = function() {
	App.currentView = 'content';
};

/**
*	Template - views_page
*	Callback called automatically when the template instance is created.
*	@method rendered
*	@return undefined
*/
Template['views_page'].rendered = function() {
	$('body').addClass('page');
};

/**
*	Template - views_page
*	Callback called automatically when the template instance is created.
*	@method destroyed
*	@return undefined
*/
Template['views_page'].destroyed = function() {
	$('body').removeClass();
};

/**
 *	Template - views_page
 *	Helper function to return the page data
 *	@method pageData
 *	@return {Object} - the page data 
 */
Template['views_page'].pageData = function() {
	return App.models.pages.findOne({'slug': this._page_slug});
};

/**
 *	Template - views_item
 *	Helper function to return the correct content
 *	@method content
 *	@return {String} the content with the correct html tag
 */
Template['views_item'].content = function() {
	var self = this,
	tags = {
		singleNode: function() {
			var node = document.createElement(self.type),
				text = document.createTextNode(self.content);
			node.appendChild(text);
			console.log(node.textContent);
			return node;
		},
		dateNode: function() {
			var date = '';
			return 'A date!';
		},
		listNode: function() {
			var list = '';
			return list;
		}
	};

	switch(this.type) {
		case 'date': 
			return tags.dateNode();
		case 'list': 
			return tags.listNode();
		default: 
			return tags.singleNode();
			break;
	}

};