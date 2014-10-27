/** 
 *	The slider class, which acts upon one or more slider elements
 *	@class Slider
 *	@param {String} sliderClassName - the class name for the slider element(s)
 *	@constructor
 */
function Slider(sliderClassName) {

	/**
	 *	The slider elements selected by class name, for which 
	 *	we can have none or more.
	 *
	 *	@property sliderElements
	 *	@type {Object}
	 */
	this.sliderElements = document.getElementsByClassName(sliderClassName);

	this.init();
};

/**
 *	Function to initialise the slider, adding events and callbacks
 *
 *	@method init
 *	@return undefined
 */
Slider.prototype.init = function() {
	console.log(this.sliderElements);
};