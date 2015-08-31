'use strict';

/**
 *	Dependencies to be used in the app
 *	
 *	@class Core
 *	@static
 */
Dependencies = {

	/**
	 *	Timeout to use for throttling event firing
	 */
	dependency_timeout: false,

	/**
	 *	Event based dependencies to call dependent functions
	 */
	resized: 	new Tracker.Dependency,
	scrolled: new Tracker.Dependency, 
	rendered: 	new Tracker.Dependency,

	/**
	 *	Function to attach event listeners which will fire changed on the dependencies
	 *	
	 *	@method start
	 */
	start() {
		window.addEventListener('scroll', () => {			
			clearTimeout(this.dependency_timeout);
			this.dependency_timeout = setTimeout(() => {
				this.scrolled.changed();
			}, 200);
		});

		window.addEventListener('resize', () => {			
			clearTimeout(this.dependency_timeout);
			this.dependency_timeout = setTimeout(() => {
				Device.reset();
				this.resized.changed();
			}, 200);
		});
	}
}