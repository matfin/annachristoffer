'use strict';

/**
 *	Call on Meteor to publish entries, remembering to attach the content type names to them
 *	so they can be properly filtered inside the templates.
 */
Meteor.publish('entries', function(...contentTypeNames) {	
	
	let contentTypes 		= 	Collections.contentTypes.find({name: {$in: contentTypeNames}}).fetch(),
			contentTypeIds 	= 	contentTypes.map((contentType) => contentType.sys.id),
			entries 				= 	Collections.entries.find({'sys.contentType.sys.id': {$in: contentTypeIds}}),
			attach,
			handle;

	attach = (entry, attachment) => {
		for(let key in attachment) {
			if(attachment.hasOwnProperty(key)) {
				entry[key] = attachment[key];
			}
		}
		return entry;
	};

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
	
	this.onStop(handle.stop);
	this.ready();

});
