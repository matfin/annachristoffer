'use strict';

describe('views_content', () => {
	describe('template', () => {

		let testParent;

		beforeEach(() => {
			testParent = document.createElement('div');
		});

		it('should call subscribe on the pages collection with the correct parameters', (done) => {
			/**
			 *	Spies
			 */
			spyOn(Meteor, 'subscribe').and.returnValue({
				ready: () => true
			});
			spyOn(Core.collections.pages, 'findOne').and.returnValue({
				slug: 'sample-slug',
				fields: {},
				sys: {}
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
			expect(Meteor.subscribe.calls.argsFor(0)).toEqual(['pages', {'fields.slug': 'sample-slug'}, {onReady: jasmine.any(Function), onStop: jasmine.any(Function)}]);
			expect(Meteor.subscribe.calls.argsFor(1)).toEqual(['experiences', {onStop: jasmine.any(Function)}]);

			/**
			 *	Done
			 */
			done();
		});

		xit('should call refreshFromPage on the core seo helper with the correct parameters', (done) => {
			/**
			 *	Spies
			 */
			spyOn(Core.seo, 'refreshFromPage').and.returnValue();

			/**
			 *	Dummy data
			 */
			let data = {
				fields: {
					slug: 'dummy-slug'
				}
			};

			/**
			 *	Render the template and then run the tests
			 */
			Blaze.renderWithData(Template.views_content, data, testParent);
			expect(Core.seo.refreshFromPage).toHaveBeenCalledWith('dummy-slug')

			/**
			 *	Finished
			 */
			done();
		});

	});

	describe('helpers', () => {

		describe('page', () => {
			it('should call findOne on the pages collection with the correct parameters', (done) => {
				/**
				 *	Spies
				 */
				spyOn(Core.collections.pages, 'findOne').and.returnValue({});

				/**
				 *	Dummy data
				 */
				let data = {
					slug: 'dummy-page'
				};

				/**
				 *	Call the function and run the test
				 */
				Template.views_content.__helpers[' page'].call(data);
				expect(Core.collections.pages.findOne).toHaveBeenCalledWith({'fields.slug': 'dummy-page'});

				/**
				 *	Done
				 */
				done();
			});
		});

		describe('image', () => {

			it('should call findOne on the pages collection with the correct parameters and return an image if present', (done) => {
				/**
				 *	Spies
				 */
				spyOn(Core.collections.pages, 'findOne').and.returnValue({
					fields: {
						images: [{
							fields: {},
							sys: {}
						}]
					}
				});

				/**
				 *	Dummy data
				 */
				let data = {
					slug: 'dummy-slug'
				};

				/**
				 *	Call the function and run the test
				 */
				expect(Template.views_content.__helpers[' image'].call(data)).toEqual({fields: {}, sys: {}});
				expect(Core.collections.pages.findOne).toHaveBeenCalledWith({'fields.slug': 'dummy-slug'});

				/** 
				 *	Done
				 */
				done();
			});

			it('should return immediately if no image is present', (done) => {
				/**
				 *	Spies
				 */
				spyOn(Core.collections.pages, 'findOne').and.returnValue({
					fields: {}
				});
				/**
				 *	Dummy data
				 */
				let data = {
					slug: 'dummy-slug'
				};
				/**
				 *	Call the function and run the test
				 */
				expect(Template.views_content.__helpers[' image'].call(data)).toBeUndefined();
				/** 
				 *	Done
				 */
				done();
			});

		});

		describe('experience', () => {
			it('should call find on the experiences collection with the correct parameters', (done) => {
				/**
				 *	Spies
				 */
				spyOn(Core.collections.experiences, 'find').and.returnValue({
					fetch: () => true
				});

				/**
				 *	Call the function and run the test
				 */
				Template.views_content.__helpers[' experience']('dummy-type');
				expect(Core.collections.experiences.find).toHaveBeenCalledWith({'fields.type': 'dummy-type'}, {sort: {'fields.startDate': -1}});

				/**
				 *	Done
				 */
				done();
			});
		});

	});

});