/**
 *	Template - views_page
 *	Callback called automatically when the template instance is created.
 *	@method created
 *	@return undefined
 */
Template['views_page'].created = function() {
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
 *	Template - views_item
 *	Helper functions for this template
 */
Template['views_page'].helpers({

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
 *	Template - views_item
 *	Helper functions for this template
 */
Template['views_item'].helpers({

	/**
	 *	Helper function to return the correct template to load based on the content type
	 */ 
	dynamicTemplate: function() {
		switch(this.type) {
			case 'date': 
				return Template['item_dateNode'];
			case 'list':
				return Template['item_listNode'];
			default: 
				return Template['item_textNode'];
		}
	}
});

/**
 *	Template - item_textNode
 *	Helper functions for this template
 */
Template['item_textNode'].helpers({

	/**
	 *	Helper function to determine the tag of the current data item
	 */
	isTag: function(tagName) {
		return tagName === this.type;
	}

});

/**
 *	Template - item_dateNode
 *	Helper functions for this template
 */
Template['item_dateNode'].helpers({

	/**
	 *	Helper function to determine if the date exists
	 */
	exists: function(date) {
		return typeof date !== 'undefined' && date.length > 0;
	}

});