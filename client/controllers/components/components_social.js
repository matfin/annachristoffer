/**
 *	Template - components_social
 *	Callback called automatically when the template instance is created.
 *	@method created
 *	@return undefined
 */
Template['components_social'].created = function() {
	this.data.opened = false;
};

/**
 *	Template - components_social
 *	Callback called automatically when the template instance is rendered.
 *	@method rendered
 *	@return undefined
 */
Template['components_social'].rendered = function() {
};

/**
 *	Template - components_social
 *	Callback called automatically when the template instance is destroyed.
 *	@method destroyed
 *	@return undefined
 */
Template['components_social'].destroyed = function() {

};

/**
 *	Template - components_social
 *	Events
 */
Template['components_social'].events = {

	'click button:first-child': function(e, template) {

		if(this.opened) {
			template.$('button:not(:first-child)').css({
				width: '0%'
			});
			this.opened = false;
		}
		else {
			template.$('button').css({
				width: '25%'
			});
			this.opened = true;
		}
	}	

};
