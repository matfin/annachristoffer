/**
 *	Template - layout
 *	Server side controller for the layout template
 */
SSR.compileTemplate('layout', Assets.getText('layout.html'));

/**
 *	Template - layout
 *	Helpers
 */
Template.layout.helpers({
	
	/**
	 *	@method getDocType
	 *	@return {String} - the doctype
	 */
	getDocType: function() {
		return '<!DOCTYPE html>';
	}
});
