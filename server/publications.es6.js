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
 *	Function to return a collection cursor for entries given a content type name
 *
 *	@method entriesOfType
 *	@param 	{String} type - the name of the client side collection
 *	@param 	{Object} filter - optional selector 
 *	@return {Boolean} - true when the subscription is ready
 */
let entriesOfType = function(type, filter = {}) {

	let mappedNames = [
		{collection: 'projects', 			contentTypeName: 'Project'},
		{collection: 'projectitems', 	contentTypeName: 'Project Item'},
		{collection: 'categories', 		contentTypeName: 'Project Category'},
		{collection: 'pages', 				contentTypeName: 'Page'},
		{collection: 'contentitems', 	contentTypeName: 'Content Item'},
		{collection: 'experiences', 	contentTypeName: 'Experience'}
	],
	mappedName 			= mappedNames.find((mappedName) => mappedName.collection === type),
	contentType 		= Collections.contentTypes.findOne({name: mappedName.contentTypeName}),
	entries,
	handle;

	if(typeof contentType === 'undefined') {
		console.log(`Could not find collection of type: ${type}`);
		return;
	}

	let selector 	= attach({'sys.contentType.sys.id': contentType.sys.id}, filter);
	entries 			= Collections.entries.find(selector);

	handle = entries.observeChanges({
		added: (id, entry) => {
			this.added(type, id, entry);
		},
		changed: (id, entry) => {
			this.changed(type, id, entry);
		},
		removed: (id, entry) => {
			this.removed(type, id, entry);
		}
	});

	this.onStop(() => {
		handle.stop();
	});

	this.ready();
};	

/** 
 *	The Meteor publish functions for each type of entry
 */
Meteor.publish('projects', function(filter) {
	entriesOfType.call(this, 'projects', filter);
});

Meteor.publish('categories', function(filter) {
	entriesOfType.call(this, 'categories', filter);
});

Meteor.publish('pages', function(filter) {
	entriesOfType.call(this, 'pages', filter);
});

Meteor.publish('experiences', function(filter) {
	entriesOfType.call(this, 'experiences', filter);
});

Meteor.publish('projectitems', function(filter) {
	entriesOfType.call(this, 'projectitems', filter);
});

Meteor.publish('contentitems', function(filter) {
	entriesOfType.call(this, 'contentitems', filter);
});

/**
 *	Call on Meteor to publish images
 *
 *	@param {Array} 		- spread parameter containing one or more matching IDs to act as a selector
 *	@return {Object} 	- MongoDB cursor
 */
Meteor.publish('images', (...imageIds) => Collections.images.find({'asset_id': {$in: imageIds}}));

/** 
 *	Call on Meteor to publish videos from the Wistia video collection
 *	
 *	@param {String} 	- the name of the collection being subscribed to
 *	@param {Array} 		- spead parameter cntaining one or more hashed IDs to act as a selector 
 *	@return {Object} 	- MongoDB cursor
 */
Meteor.publish('videos', (...hashedIds) => Wistia.collection.find({'hashed_id': {$in: hashedIds}}));

