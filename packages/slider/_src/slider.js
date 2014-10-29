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
	 *	Used to store the current translated X coordinate of the slider
	 *
	 *	@property sliderX
	 *	@type {number}
	 *	@default {0}
	 */
	this.sliderX = 0;

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
	 *	The id associated with the repaint of the slider 
	 *	
	 *	@property animationFrameId
	 *	@type {number}
	 */
	this.animationFrameId;

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
	this.container.addEventListener('dragstart', function(e) {
		e.preventDefault();
	});

	/**
	 *	Then add the other events
	 */
	this.container.addEventListener('mousedown', function(e) {
		/**
		 *	Set mousedown state and call the slider update function
		 *	to trigger a repaint on window repaint
		 */
		self.update();
		self.mousedown = e.pageX;
	});

	this.container.addEventListener('mousemove', function(e) {

		/**
		 *	Update the coordinates for the mouse direction.
		 *	This will be used to determine the translation
		 *	for the slider repaint function.
		 */
		if(self.mousedown) {
			self.dx = 0 - (self.mousedown - e.pageX);
		}
	});

	/**
	 *	Reset mousedown state
	 */
	this.container.addEventListener('mouseup', function(e) {
		/**
		 *	Cancel the repaint of the slider and reset mouse diff
		 *	but first update the sliderX coordinates.
		 */
		self.mousedown = false;
		self.cancelUpdate();
		self.sliderX += self.dx;
		self.dx = 0;
	});

	this.container.addEventListener('mouseleave', function(e) {
		/**
		 *	Cancel the repaint of the slider and reset mouse diff
		 */
		self.mousedown = false;
		self.cancelUpdate();
		self.sliderX += self.dx;
		self.dx = 0;
	});

};

/**
 *	Function for cross browser translation
 */

/**
 *	Function to repaint the slider when needed	
 *
 *	@method update
 *	@return undefined
 */
SliderElement.prototype.update = function() {

	/**
	 *	By calling this binding, this function will continuously run
	 *	each time an animation frame is requested, effectively giving 
	 *	us a nicely timed loop so we can update the UI for the slider.
	 */
	this.animationFrameId = this.requestAnimationFrame(this.update.bind(this));
	var translateX = (this.sliderX + this.dx);
	this.slider.style.transform = this.slider.style.webkitTransform = 'translate3d(' + translateX + 'px,0,0)';
};

/**
 *	Function to cancel repainting of the slider
 */
SliderElement.prototype.cancelUpdate = function() {
	window.cancelAnimationFrame(this.animationFrameId);
	this.animationFrameId = 0;
};

/**
 *	Method to request animation tick for the slider using
 *	
 *	@method requestAnimationFrame
 *	@param {function} callback - the callback to execute 
 *	@return {object} the callback executed on window repaint
 */
SliderElement.prototype.requestAnimationFrame = function(callback) {

	return	window.requestAnimationFrame(callback)			||
			window.webkitRequestAnimationFrame(callback)	||
			window.mozRequestAnimationFrame(callback)		||
			window.oRequestAnimationFrame(callback)			||
			window.msRequestAnimationFrame(callback)		||
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
	 *	@param {string} sliderSelectorContainer - A string representing the selector for the slider container(s)
	 *	@return undefined
	 */
	setup: function(sliderContainerSelector) {

		var self = this,
			sliderContainers = document.querySelectorAll(sliderContainerSelector);

		/**
		 *	Use Array.prototype foreach call passing in the sliderContainers,
		 *	looping through and matching all items in the above query.
		 */
		[].forEach.call(sliderContainers, function(sliderContainer) {
			self.addSlide(sliderContainer);
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