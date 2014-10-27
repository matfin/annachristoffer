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
	 *	@type {object}
	 */
	this.container = domNode;

	/**
	 *	The slider that needs to be scrolled
	 *	
	 *	@property slider
	 *	@type {object}
	 */
	this.slider = {};

	/**
	 *	Used to calculate the movement of the mouse along the x 
	 *	axis from when the mouse button was first held down
	 *	
	 *	@property dx
	 *	@type {number}
	 *	@default 0
	 */
	this.dx = 0;

	/**
	 *	Determine whether to start dragging the slider with this.
	 *
	 *	@property mousedown
	 *	@type {number}
	 *	@default 0
	 */
	this.mousedown = 0;

	/**
	 *	The slides contained within the slider
	 *
	 *	@property slides
	 *	@type {Object}
	 */
	this.slides = {};

	/**
	 *	The slider width, determined by the slider container width
	 *	
	 *	@property sliderWidth
	 *	@type {number}
	 *	@default 0
	 */
	this.sliderWidth = 0;

	/**
	 *	Finally, initialise the slider.
	 */
	this.init();
};

SliderElement.prototype.init = function() {

	/**
	 *	Setting up
	 */
	this.slider = this.container.getElementsByClassName('slider')[0];
	this.slides = this.container.getElementsByClassName('slide');
	this.sliderWidth = this.container.offsetWidth;

	/**
	 *	Finally, set up the events
 	 */
 	this.setupEvents();

};

/**
 *	Method to set up the events for the SliderElement
 *	
 *	@method setupEvents
 *	@return undefined
 */
SliderElement.prototype.setupEvents = function() {

	/**
	 *	Reference 'this' inside function scope by assigning it to self.
	 */
	var self = this;

	/**
	 *	Prevent dragging of images by default
	 */
	this.slider.addEventListener('dragstart', function(e) {
		e.preventDefault();
	});

	/**
	 *	Then add the other events
	 */
	this.slider.addEventListener('mousedown', function(e) {
		/**
		 *	Set mousedown state
		 */
		self.mousedown = e.offsetX;
	});

	this.slider.addEventListener('mousemove', _.throttle(function(e) {
		self.dx = 0 + (self.mousedown - e.offsetX);
		self.move();
	}, 250));

	/**
	 *	Reset mousedown state
	 */
	this.slider.addEventListener('mouseup', function() {
		self.mousedown = false;
	});

	this.slider.addEventListener('mouseout', function() {
		self.mousedown = false;
	});

};

SliderElement.prototype.move = function() {
	//Put a nice fast translate 
};

/**
 *	Method to request animation tick for the slider using
 *	
 *	@method requestAnimationTick
 *	@param {function} callback - the callback to execute 
 */
SliderElement.prototype.requestAnimationTick = function(callback) {

	return	window.requestAnimationFrame(callback)			||
			window.webkitRequestAnimationFrame(callback)	||
			window.mozRequestAnimationFrame(callback)		||
			function(callback) {
				window.setTimeout(callback, 1000 / 60);
			};
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