'use strict';

/**
 *	Helper functions to be used in view controllers
 *	
 *	@class Helpers
 *	@static
 */
Core.helpers = class Helpers {

	/**
	 *	Helper function to determine if a dom element is visible in the viewport
	 *
	 *	@method isVisible
	 *	@param 	{Object} domnode - the dom node to check
	 *	@return {Boolean} - true if the element is in view or false
	 */
	static isVisible (domnode) {
		let node_top 				= domnode.getBoundingClientRect().top,	
				viewport_height	= window.innerHeight,
				scrolled 				= window.scrollY;
		return (node_top - scrolled) <= viewport_height;
	}

	/**
	 *	Helper function to initiate loading of an image
	 *
	 *	@method lazyLoad
	 *	@param 	{Object} - the dom node for the image
	 */
	static lazyLoad (imgnode) {
		let image 		= new Image(),
				data_src	= imgnode.getAttribute('data-src'),
				loaded		= typeof imgnode.attributes.src !== 'undefined',
				visible 	= this.isVisible(imgnode),
				callback;
				
		if(!loaded && visible) {
			image.src = data_src;
			image.onload = () => {
				imgnode.setAttribute('src', data_src);
				callback();
			}
		}

		return {
			then: (cb) => { callback = cb; }
		}
	}

	/**
	 *	Function to observe a mutation on a dom element
	 *
	 *	@method observeMutation
	 */
	static observeMutation (target) {
		let observer = new MutationObserver((mutations) => {
			mutations.forEach((mutation) => {console.log(mutation)});
		});	
		observer.observe(target, {attributes: true});
	}

};
