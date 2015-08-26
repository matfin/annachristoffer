'use strict';

/**
 *	Call on Meteor to publish entries, remembering to attach the content type names to them
 *	so they can be properly filtered inside the templates. An optional filter can also be 
 *	applied.
 */
Meteor.publish('entries', function(contentTypeName, filter = {}) {	

	let attach = (entry, attachment) => {
		for(let key in attachment) {
			if(attachment.hasOwnProperty(key)) {
				entry[key] = attachment[key];
			}
		}
		return entry;
	};

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

Meteor.publish('videos', (...hashedIds) => Wistia.collection.find({'hashed_id': {$in: hashedIds}}));
Meteor.publish('images', (...imageIds) => Collections.images.find({'asset_id': {$in: imageIds}}));