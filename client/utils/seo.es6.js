'use strict';

/** 
 *	Client side class to set the SEO meta tags for the views
 *
 *	@class Seo
 */
Core.seo = class Seo {

	/**
	 *	Function to read in and refresh the meta tags in the document head
	 *
	 *	@method refresh
	 *	@param 	{Object} seo_data - an object map containing title, description, image, url and type
	 */
	static refresh(seo_data) {
		console.log(seo_data, ' is hte data');
		let keys = ['title', 'description', 'image', 'type', 'url'];
		keys.forEach((key) => {
			this[key] = seo_data[key];
		});

		this.refreshTwitter();
	}

	/**
	 *	Function to refresh all twitter meta properties
	 */
	static refreshTwitter() {
		let head 				= document.head,
				meta_title 				= head.querySelectorAll('meta[name="twitter:title"]')[0],
				meta_description 	= head.querySelectorAll('meta[name="twitter:description"]')[0],
				meta_image 				= head.querySelectorAll('meta[name="twitter:image:src"]')[0],
				meta_url 					= head.querySelectorAll('meta[name="twitter:url"]')[0];

		meta_title.content = this.title;
		meta_description.content = this.description;
		meta_image.content = this.image;
		meta_url.content = this.url;
	}

};