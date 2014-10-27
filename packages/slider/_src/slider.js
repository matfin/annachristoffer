/**
 *	SliderElement class, representing an individual DOM node for the sliders.
 *	This is so we can add sliders and attach events to them individually.
 *	
 *	@class SliderElement
 *	@param {Object} domNode - the individual DOM node representing the Slider Element
 *	@constructor
 */
function SliderElement(domNode) {
	/**
	 *	The html dom element for the slider	
	 *
	 *	@property node
	 *	@type object
	 */
	this.node = domNode;

	/**
	 *	Used to calculate the movement of the mouse along the x 
	 *	axis from when the mouse button was first held down
	 *	
	 *	@property dx
	 *	@type {number}
	 *	@default 0
	 */
	this.dx = 0;

	this.setupEvents();
};

/**
 *	Method to set up the events for the SliderElement
 *	
 *	@method setupEvents
 *	@return undefined
 */
SliderElement.prototype.setupEvents = function() {

	console.log('Setting up events');

	/**
	 *	Reference 'this' inside function scope by assigning it to self.
	 */

	var self = this;

	console.log(this.node);

	/**
	 *	Prevent dragging of images by default
	 */
	this.node.addEventListener('dragstart', function(e) {
		e.preventDefault();
	});

	/**
	 *	Then add the other events
	 */
	this.node.addEventListener('mousedown', function() {
		console.log('Mouse is down!');
	});

	this.node.addEventListener('mousemove', function() {
		console.log('Mouse is moving!');
	});

	this.node.addEventListener('mouseup', function() {
		console.log('Mouse is up!');
	});

};


/** 
 *	The slider class, which acts upon one or more slider elements
 *
 *	@class Slider
 *
 */
Slider = {

	/**
	 *	The slider elements selected by class name, for which 
	 *	we can have none or more.
	 *
	 *	@property sliderElements
	 *	@type {Array}
	 */
	sliderElements: [],

	/**
	 *	Function to set up the slider elements with
	 *
	 *	@method setup
	 *	@param {object} sliders - slider dom elements obtained from a selector
	 *	@return undefined
	 */
	setup: function(sliders) {

		var self = this;
		
		_.each(sliders, function(sliderItem) {
			self.addSlide(sliderItem)
		});
	},	

	/**
	 *	Function to initialise a new SliderElement and add it to the Slider
	 *	@param {object} sliderItem - slider dom element
	 *	@return undefined
	 */
	addSlide: function(sliderItem) {
		this.sliderElements.push(new SliderElement(sliderItem));
	}
};