'use strict';

describe('views_content', () => {
	describe('template', () => {

		let testParent;

		beforeEach(() => {
			testParent = document.createElement('div');
		});

		it('should call subscribe on the entries collection with the correct parameters', (done) => {
			/**
			 *	Spies
			 */
			spyOn(Meteor, 'subscribe').and.returnValue({
				ready: () => true
			});

			/**
			 *	Dummy data
			 */
			let data = {
				slug: 'sample-slug'
			};

			/** 
			 *	Render the template and then run the tests
			 */
			Blaze.renderWithData(Template.views_content, data, testParent);
			expect(Meteor.subscribe.calls.argsFor(0)).toEqual(['entries', 'Content Item', {'fields.page': 'sample-slug'}, {onStop: jasmine.any(Function)}]);
			expect(Meteor.subscribe.calls.argsFor(1)).toEqual(['entries', 'Experience', {onStop: jasmine.any(Function)}]);

			/**
			 *	Done
			 */
			done();
		});

	});

	describe('helpers', () => {

		describe('items', () => {
			it('should call find on the entries collection with the correct parameters', (done) => {
				/**
				 *	Spies
				 */
				spyOn(Core.collections.entries, 'find').and.returnValue({});

				/**
				 *	Dummy data
				 */
				let data = {
					slug: 'dummy-page'
				};

				/**
				 *	Call the function and run the test
				 */
				Template.views_content.__helpers[' items'].call(data);
				expect(Core.collections.entries.find).toHaveBeenCalledWith({contentTypeName: 'Content Item', 'fields.page': 'dummy-page'});

				/**
				 *	Done
				 */
				done();
			});
		});

		describe('experience', () => {
			it('should call find on the entries collection with the correct parameters', (done) => {
				/**
				 *	Spies
				 */
				spyOn(Core.collections.entries, 'find').and.returnValue({});

				/**
				 *	Call the function and run the test
				 */
				Template.views_content.__helpers[' experience']('dummy-type');
				expect(Core.collections.entries.find).toHaveBeenCalledWith({contentTypeName: 'Experience', 'fields.type': 'dummy-type'});

				/**
				 *	Done
				 */
				done();
			});
		});

	});

});