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
	 *	The events we need to attach to the slider, for mouse and touch events
	 *
	 *	@property events
	 *	@type {Object}
	 *	@default {}
	 */
	this.events = {};

	/**
	 *	The id associated with the repaint of the slider 
	 *	
	 *	@property animationFrameId
	 *	@type {number}
	 */
	this.animationFrameId;

	/**
	 *	Grouped ids associated with multiple repaints on the slider
	 *
	 *	@property animationFrameIds
	 *	@type {array}
	 */
	this.animationFrameIds = [];

	/**
	 *	Callback timeout to be used by functions spawned multiple times 
	 *	and that have callbacks that only need to be called once.
	 *	
	 *	@property callbackTimeout
	 *	@type {number}
	 */
	this.callbackTimeout;

	/**
	 *	Custom events: ie; for when the slider is dropped
	 *
	 *	@property customEvents
	 *	@type {Object}
	 *	@default {}
	 */
	this.customEvents;

	/**
	 *	Custom options for the slider
	 *
	 *	@property options
	 *	@type {Object}
	 *	@default {}
	 *	@TODO: Allow these to be passed in externally
	 */
	this.options;

	/**
	 *	Current slider speed when it is snapping back to a position
	 *
	 *	@property {number} currentSpeed
	 *	@default 0
	 */
	this.currentSpeed = 0;

	/**
	 *	The current slide the slider is on
	 *
	 *	@property {number} currentSlide
	 *	@default 0
	 */
	this.currentSlide = 0;

	/**
	 *	Slider is animating
	 *
	 *	@property {boolean} isAnimating
	 *	@default false
	 */
	this.isAnimating = false;

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
	 *	Adding custom events
	 */
	this.customEvents = {
		sliderdrop: new CustomEvent('sliderdrop',{})
	};

	/**
	 *	And slider options
	 */
	this.options = {
		snapToNearest: true,
		snapSpeedMillis: 400
	};

	/** 
	 *	The events added now which need to be set up later
	 */
	this.events = [
		{
			listeners: {
				mouse: 'dragstart',
				touch: 'touchdragstart'
			},
			attachTo: this.container,
			functionCall: this.onDragStart
		},
		{
			listeners: {
				mouse: 'mousedown',
				touch: 'touchstart'
			},
			attachTo: this.container,
			functionCall: this.onDown
		},
		{
			listeners: {
				mouse: 'mousemove',
				touch: 'touchmove'
			},
			attachTo: this.container,
			functionCall: this.onMove
		},
		{
			listeners: {
				mouse: 'mouseup',
				touch: 'touchend'
			},
			attachTo: this.container,
			functionCall: this.onUp
		},
		{
			listeners: {
				mouse: 'mouseleave',
				touch: 'touchleave'
			},
			attachTo: this.container,
			functionCall: this.onLeave
		},
		{
			listeners: {
				mouse: 'sliderdrop',
				touch: 'sliderdrop'
			},
			attachTo: this.container,
			functionCall: this.onSliderDrop
		}
	];

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
	 *	Loop through each event and set it up
	 */
	[].forEach.call(this.events, function(eventObject) {

		/** 
		 *	Attach mouse events if this is not a touch device,
		 *	or add touch events. Note that we bind the current
		 *	instance of the sliderElement to the function call,
		 *	or we would be passing in the element in question.
		 */
		if(!self.isTouchCapable()) {
			eventObject.attachTo.addEventListener(eventObject.listeners.mouse, eventObject.functionCall.bind(self), false);
		}
		else {
			eventObject.attachTo.addEventListener(eventObject.listeners.touch, eventObject.functionCall.bind(self), false);
		}

	});
};

/**
 *	Function to call on dragstart events for mouse and touch based devices
 *
 *	@method onDragStart
 *	@param {object} e - the event
 *	@return undefined
 */
SliderElement.prototype.onDragStart = function(e) {
	/**
	 *	Called on events 'touchdragstart' and 'dragstart'
	 */
	e.preventDefault();
};

/**
 *	Function to call on mousedown and touchstart events for mouse and touch based devices
 *
 *	@method onDown
 *	@param {object} e - the event
 *	@return undefined
 */
SliderElement.prototype.onDown = function(e) {
	/**
	 *	Called on events 'touchstart' and 'mousedown'.
	 *	Set mousedown state and call the slider update function
	 *	to trigger a repaint on window repaint.
	 *
	 *	Important: Remember to kill all actively running animations
	 */
	this.killAnimations();
	this.cancelUpdate();
	this.update();
	this.mousedown = e.pageX || e.touches[0].pageX;
};

/**
 *	Function to call on mousemove and touchmove events for mouse and touch based devices
 *
 *	@method onMove
 *	@param {object} e - the event
 *	@return undefined
 */
SliderElement.prototype.onMove = function(e) {
	/**
	 *	Called on events 'touchmove' and 'mousemove'.
	 *
	 *	Update the coordinates for the mouse direction.
	 *	This will be used to determine the translation
	 *	for the slider repaint function.
	 */

	e.preventDefault();

	if(this.mousedown) {
		var xCoord = e.pageX || e.touches[0].pageX;
		this.dx = 0 - (this.mousedown - xCoord);
	}
};

/**
 *	Function to call on mouseup and touchend events for mouse and touch based devices
 *
 *	@method onUp
 *	@param {object} e - the event
 *	@return undefined
 */
SliderElement.prototype.onUp = function(e) {
	/**
	 *	Called on events 'touchend' and 'mouseup'.
	 *	Cancel the repaint of the slider and reset mouse diff
	 *	but first update the sliderX coordinates.
	 */
	this.mousedown = false;
	this.cancelUpdate();
	this.sliderX += this.dx;
	this.customEvents.sliderdrop.dx = this.dx;
	this.dx = 0;

	/**
	 *	Finally, trigger the sliderdrop event
	 */
	this.container.dispatchEvent(this.customEvents.sliderdrop);

};

/**
 *	Function to call on mouseleave and touchleave events for mouse and touch based devices
 *
 *	@method onLeave
 *	@param {object} e - the event
 *	@return undefined
 */
SliderElement.prototype.onLeave = function(e) {
	/**
	 *	Called on events 'touchleave' and 'mouseleave'.
	 *	Cancel the repaint of the slider and reset mouse diff
	 */
	this.mousedown = false;
	this.cancelUpdate();
	this.sliderX += this.dx;
	this.customEvents.sliderdrop.dx = this.dx;
	this.dx = 0;

	/**
	 *	Finally, trigger the sliderdrop event
	 */
	this.container.dispatchEvent(this.customEvents.sliderdrop);
};

/**
 *	Function to call when the slider has been dropped, as in, 
 *	when the mouse or touch leaves the slider area and it is 
 *	no longer scrolling.
 *
 *	@method onSliderDrop
 *	@param {object} - custom event parameter containing the drop X coordinate {e.dx}
 *	@return undefined
 */
SliderElement.prototype.onSliderDrop = function(e) {

	/**
	 *	Function carrying out calculations helping to decide whether to 
	 *	move the slider and if so, in which direction.
	 *
	 *	If it has moved more than 50% in any direction, then the threshhold 
	 *	has been met and we should move to the nexr/prev slide.
	 *
	 *	If the direction the slider was pulled was negative, then move it to 
	 *	the left, ot move it to the right, if the threshhold has been met.
	 *
	 *	This is a self-executing function, whose values are assigned to movement.
	 */
	var movement = (function(dx) {
		var amount = e.dx < 0 ? 0 - e.dx:e.dx,
			threshholdCrossed = amount % this.sliderWidth > (this.sliderWidth / 4),
			direction = e.dx < 0 ? 'left':'right';
		return {
			amount: amount,
			threshholdCrossed: threshholdCrossed,
			direction: direction
		}
	}).bind(this)();

	/**
	 *	Snap the slider back into position only if this has been specified 
	 *	as an option and the slider is not already in an animating state.
	 */
	if(this.options.snapToNearest && !this.isAnimating) {

		var destinationSlide = this.currentSlide,
			translateTo = 0;

		if(movement.threshholdCrossed) {
			switch(movement.direction) {
				case 'left': 
					if(destinationSlide < (this.slides.length - 1)) destinationSlide++;
					break;
				case 'right': 
					if(destinationSlide > 0) destinationSlide--;
					break;
			}
		}
		
		translateTo = 0 - (destinationSlide * this.sliderWidth);

		this.isAnimating = true;

		this.translateTo(translateTo, {speed: 50}, (function() {
			this.currentSlide =+ destinationSlide;
		}).bind(this));
	}
};

/**
 *	Function to detect touch or mouse based devices
 *	
 *	@method isTouchCapable
 *	@return {boolean} true if this is a touch device or false if not
 *	
 *	@TODO: 	Dealing with hybrid devices, like the lenovo touch which
 *			has both a touchscreen and mouse.
 */
SliderElement.prototype.isTouchCapable = function() {
	return 'ontouchstart' in document.documentElement;
};

/**
 *	Function to repaint the slider when needed	
 *
 *	@method update
 *	@param  {number} movementMultiplier - how many pixels to move per mouse pixel moved
 *	@return undefined
 */
SliderElement.prototype.update = function() {

	/**
	 *	By calling this binding, this function will continuously run
	 *	each time an animation frame is requested, effectively giving 
	 *	us a nicely timed loop so we can update the UI for the slider.
	 *
	 */
	this.animationFrameId = this.requestAnimationFrame(this.update.bind(this));
	var translateX = (this.sliderX + this.dx);
	this.transform(translateX);
};

/**
 *	Function to apply CSS transforms for the slider
 *
 *	@method transform
 *	@param {number} translateX - the CSS transform translateX property
 */
SliderElement.prototype.transform = function(translateX) {
	if(typeof translateX !== 'number') {
		throw {
			error: 'Not a number',
			message: 'translateX parameter needs to be a number. You passed in: ' + (typeof translateX)
		}
		return;
	}

	this.slider.style.transform = this.slider.style.webkitTransform = 'translate3d(' + translateX + 'px,0,0)';
};

/**
 *	Debug helper function
 *
 *	@method debug
 *	@param {string} message - the debug message to render
 *	@return undefined
 */
SliderElement.prototype.debug = function(message) {
	var debug = document.querySelector('.debug');
	if(debug.firstChild) {
		debug.removeChild(debug.firstChild);
	}

	debug.appendChild(document.createTextNode(message));
};

/**
 *	Function to cancel repainting of the slider
 *	
 *	@method cancelUpdate
 *	@return undefined
 */
SliderElement.prototype.cancelUpdate = function() {
	window.cancelAnimationFrame(this.animationFrameId);
	this.animationFrameId = 0;
};

/**
 *	Method to request animation tick for the slider (cross-browser)
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
 *	Method to move the slider on its own without interaction
 *	
 *	@method translateTo
 *	@param {number} x - the X coordinate to move to
 *	@param {object} options - optional parameters to pass in, such as speed of movement
 *	@param {callback} callback - optional callback to execute when the slider has reached its intended point
 *	@return undefined
 */

SliderElement.prototype.translateTo = function(x, options, callback) {

	/**
	 *	To give the impression of speed, we are spawning this function x number of times 
	 *	so that the transform X of the slider is called per requestedAnimationframe.
	 *	Example: If options.speed is set to 60, then this function will request a tick 
	 *	60 times, for silky smooth animation.
	 */
	if(typeof options !== 'undefined' && typeof options.speed === 'number' && this.currentSpeed < options.speed) {
		this.animationFrameIds[this.currentSpeed] = (this.requestAnimationFrame(this.translateTo.bind(this, x, options, callback)));
		this.currentSpeed++;
	}

	/**
	 *	We need the callback to be run only once when the animation is complete,
	 *	so clear the timeout by default when this is called.
	 */
	clearTimeout(this.callbackTimeout);

	if(x === this.sliderX) {
		/**
		 *	If we have reached the point we wanted to get to,
		 *	then cancel the update and execute the optional 
		 *	callback after 100ms in the timeout
		 */
		this.killAnimations();
		this.currentSpeed = 0;
		this.callbackTimeout = setTimeout(function(){
			if(typeof callback === 'function') {
				callback();
			}
			this.isAnimating = false;
		}.bind(this), 5);

		return;
	}
	if(x < this.sliderX) {
		this.sliderX--;
		this.transform(this.sliderX);
	}
	else {
		this.sliderX++;
		this.transform(this.sliderX);
	}

	/**
	 *	Call a bind to this function at least once so it is run per RAF 'tick'
	 */
	this.requestAnimationFrame(this.translateTo.bind(this, x, options, callback));
};

SliderElement.prototype.killAnimations = function() {
	[].forEach.call(this.animationFrameIds, function(animationFrameId) {
		window.cancelAnimationFrame(animationFrameId);
	});
	this.animationFrameIds = [];
	clearTimeout(this.callbackTimeout);
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