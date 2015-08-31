'use strict';

describe('views_list', () => {

	let testParent;

	describe('template', () => {
		
		beforeEach(() => {
			testParent = document.createElement('div');
		});

		afterEach(() => {
			testParent = document.createElement('div');
		});

		it('should subscribe to the projects collection with the correct parameters', (done) => {
			/**
			 *	Spies
			 */
			spyOn(Meteor, 'subscribe').and.returnValue({
				subscriptionId: 1,
				ready: () => true
			});

			/**
			 *	Dummy data
			 */
			let data = {
				slug: 'test-slug'
			};

			/**
			 *	Call render and then run the tests
			 */
			Blaze.renderWithData(Template.views_list, data, testParent);
			expect(Meteor.subscribe).toHaveBeenCalledWith('projects', {onStop: jasmine.any(Function)});

			/**
			 *	Finish
			 */
			done();
		});

	});

	describe('helpers', () => {

		describe('projects', () => {
			it('should call find on the projects collection with the correct parameters', (done) => {

				/**
				 *	Spies
				 */
				spyOn(Core.collections.projects, 'find').and.returnValue({
					fetch: () => true
				});
				spyOn(Core.collections.projects, 'findOne').and.returnValue({
					fields: {
						items: [{},{},{}]
					}
				});

				/**
				 *	Call the helper function and run the test
				 */
				Template.views_list.__helpers[' projects']();
				expect(Core.collections.projects.find).toHaveBeenCalledWith({}, {sort: {'fields.createdAt': - 1}});

				/**
				 *	Finished
				 */
				done();
			});
		});
	});

});