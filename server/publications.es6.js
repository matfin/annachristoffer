'use strict';

/** 
 *	Function to attach properties to an object
 *	
 *	@method attach
 *	@param 	{Object} entry - the original object
 *	@param	{Object} attachment - selector for the properties to attach
 *	@return	{Object} - the modified entry with attached properties
 */
let attach = (entry, attachment) => {
	for(let key in attachment) {
		if(attachment.hasOwnProperty(key)) {
			entry[key] = attachment[key];
		}
	}
	return entry;
};

/**
 *	Call on Meteor to publish entries, remembering to attach the content type names to them
 *	so they can be properly filtered inside the templates. An optional filter can also be 
 *	applied.
 *	
 *	@param {String} 	- the name of the collection being subscribed to
 *	@param {Function} - callback function when publishing
 *	@param {String} contentTypeName	- the content type name to be applied as a filter
 *	@param {Object} filtert - an optional Mongo selector to apply  
 */
Meteor.publish('entries', function(contentTypeName, filter = {}) {	

	let contentTypes 		= Collections.contentTypes.find({name: contentTypeName}).fetch(),
			contentTypeIds 	= contentTypes.map((contentType) => contentType.sys.id),
			selector 				= attach({'sys.contentType.sys.id': {$in: contentTypeIds}}, filter),
			entries					=	Collections.entries.find(selector),
			handle;

	handle = entries.observeChanges({
		added: (id, entry) => {
			let contentType = contentTypes.find( (contentType) => contentType.sys.id === entry.sys.contentType.sys.id );
			this.added('entries', id, attach(entry, {contentTypeName: contentType.name}));
		},
		changed: (id, entry) => {
			let contentType = contentTypes.find( (contentType) => contentType.sys.id === entry.sys.contentType.sys.id );
			this.added('entries', id, attach(entry, {contentTypeName: contentType.name}));
		}
	});
	
	this.onStop(() => {
		handle.stop();
	});

	this.ready();
});

/**
 *	Call on Meteor to publish entries, remembering to attach some properties from
 *	its associated asset.
 *
 *	@param {String} 	- the name of the collection being subscribed to
 *	@param {Function} - callback function when publishing
 *	@param {Array} 		- spread parameter containing one or more matching IDs to act as a selector
 */
Meteor.publish('images', function(...imageIds) {

	let assets 			= Collections.assets.find({'sys.id': {$in: imageIds}}).fetch(),
			images 			= Collections.images.find({'asset_id': {$in: imageIds}}),
			handle;
	
	handle = images.observeChanges({
		added: (id, image) => {
			let asset = assets.find( (asset) => asset.sys.id === image.asset_id );
			this.added('images', id, attach(image, {title: asset.fields.title, description: asset.fields.description}));
		},
		changed: (id, image) => {
			let asset = assets.find( (asset) => asset.sys.id === image.asset_id );
			this.added('images', id, attach(image, {title: asset.fields.title, description: asset.fields.description}));
		}
	});

	this.onStop(() => {
		handle.stop();
	}); 

	this.ready();
});

/** 
 *	Call on Meteor to publish videos from the Wistia video collection
 *	
 *	@param {String} 	- the name of the collection being subscribed to
 *	@param {Array} 		- spead parameter cntaining one or more hashed IDs to act as a selector 
 */
Meteor.publish('videos', (...hashedIds) => Wistia.collection.find({'hashed_id': {$in: hashedIds}}));

