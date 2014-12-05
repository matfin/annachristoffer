/**
 *	Template - components_social
 *	Callback called automatically when the template instance is created.
 *	@method created
 *	@return undefined
 */
Template['components_social'].created = function() {

	if(this.data) {
		this.data.opened = false;
	}
	
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
				width: 0
			});
			this.opened = false;
		}
		else {
			template.$('button').css({
				width: '25%'
			});
			this.opened = true;
		}
	},

	'click button.social-share': function(e, template) {
		var button = $(e.currentTarget),
			network = button.data('share');

		switch(network) {
			case 'facebook': {
				FB.ui({
					method: 'share',
				 	href: window.location.href,
				}, function(response){});
				break;
			}
			case 'twitter': {
				/**
				 *	Window open.
				 */
				window.open('https://twitter.com/share?url=' + window.location.href + '&text=Anna%20Christoffer&', 'Tweet', 'height=450, width=550, toolbar=0, location=0, menubar=0, directories=0, scrollbars=0');

				break;
			}
			case 'pinterest': {
				break;
			}
			default: {
				//TODO
				break;
			}
		}
	}
};
