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
	 *	@method run
	 *	@param 	{Object} seo_data - an object map containing title, description, image, url and type
	 */
	static run(seo_data) {
		this.head = document.head;
		let keys = ['title', 'description', 'image', 'type', 'url'];
		keys.forEach((key) => {
			this[key] = seo_data[key];
		});

		this.refreshTwitter().refreshOG().refreshMeta().ready();
	}

	/** 
	 *	Function to set the prerender status to ready when all SEO tags have been populated
	 *	
	 *	@method ready
	 */
	static ready() {
		setTimeout(() => {
			window.prerenderReady = true;
		}, 50);
	}

	/** 
	 *	Function to fetch SEO data from a project given a slug
	 *
	 *	@method refreshFromProject
	 *	@param 	{String} slug - the project slug
	 */
	static refreshFromProject(slug) {
		let project = Core.collections.entries.findOne({contentTypeName: 'Project', 'fields.slug': slug}),
				asset,
				image,
				handle;

		if(typeof project === 'undefined') return;
		asset = project.fields.previewImage;

		if(typeof asset !== 'undefined') {
			Meteor.subscribe('images', asset.sys.id, () => {
				this.run({
					title: `Anna Claire Christoffer - ${project.fields.title}`,
					description: project.fields.description,
					image: Core.helpers.imgSource(asset.sys.id),
					url: window.location.href,
					type: 'article'
				});
			});
		}
		else {
			this.run({
				title: `Anna Claire Christoffer - ${project.fields.title}`,
				description: project.fields.description,
				url: window.location.href,
				type: 'article'
			});
		}
	}

	/**
	 *	Function to fetch SEO data for a page given a slug
	 *
	 *	@method refreshFromPage
	 *	@param 	{String} slug - the page slug to be used as a selector
	 */
	static refreshFromPage(slug) {
		let page 	= Core.collections.entries.findOne({contentTypeName: 'Page', 'fields.slug': slug}),
				asset,
				image,
				handle;

		if(typeof page === 'undefined') return;
		if(typeof page.fields.images !== 'undefined') {
			asset = page.fields.images.find((image) => image.fields.description === 'seo');
		}

		if(typeof asset !== 'undefined') {
			Meteor.subscribe('images', asset.sys.id, () => {
				this.run({
					title: page.fields.title,
					description: page.fields.description,
					image: Core.helpers.imgSource(asset.sys.id),
					url: window.location.href,
					type: 'website'
				});
			});
		}	
		else {
			this.run({
				title: page.fields.title,
				description: page.fields.description,
				url: window.location.href,
				type: 'website'
			});
		}
	}

	/**
	 *	Function to refresh all Twitter meta properties
	 *
	 *	@method refreshTwitter
	 *	@return {Object} - a self reference
	 */
	static refreshTwitter () {
		let twitter_title 					= this.head.querySelectorAll('meta[name="twitter:title"]')[0],
				twitter_description 		= this.head.querySelectorAll('meta[name="twitter:description"]')[0],
				twitter_image 					= this.head.querySelectorAll('meta[name="twitter:image:src"]')[0],
				twitter_url 						= this.head.querySelectorAll('meta[name="twitter:url"]')[0];

		twitter_title.content 			= this.title;
		twitter_description.content = this.description;
		twitter_image.content 			= this.image;
		twitter_url.content 				= this.url;

		return this;
	}

	/**
	 *	Function to refresh all Twitter meta properties
	 *
	 *	@method refreshOG
	 *	@return {Object} - a self reference
	 */
	static refreshOG () {
		let og_title 				= this.head.querySelectorAll('meta[property="og:title"]')[0],
				og_description 	= this.head.querySelectorAll('meta[property="og:description"]')[0],
				og_image 				= this.head.querySelectorAll('meta[property="og:image"]')[0],
				og_url 					= this.head.querySelectorAll('meta[property="og:url"]')[0],
				og_type 				= this.head.querySelectorAll('meta[property="og:type"]')[0];

		og_title.content 				= this.title;
		og_description.content	= this.description;
		og_image.content				= this.image;
		og_url.content					= this.url;
		og_type.content					= this.type;

		return this;
	}

	/**
	 *	Function to refresh the general meta tag propertues
	 *
	 *	@method refreshMeta
	 *	@return {Object} - a self reference
	 */
	static refreshMeta () {
		let title 				= this.head.querySelectorAll('title')[0],
				description 	= this.head.querySelectorAll('meta[name="description"]')[0],
				canonical			= this.head.querySelectorAll('link[rel="canonical"]')[0];

		title.appendChild(document.createTextNode(this.title));
		description.content = this.description;
		canonical.content 	= this.url;
		
		return this; 
	}

};