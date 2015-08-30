'use strict';

describe('views_detail', () => {

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
				subscriptionId: 3,
				ready: () => true	
			});
			spyOn(Core.collections.projects, 'findOne').and.returnValue({
				fields: {
					slug: 'a-test-project',
					items: [
						{
							sys: {
								id: '1'
							}
						},
						{
							sys: {
								id: '1'
							}
						}
					]
				}
			});

			/**
			 *	Dummy data
			 */
			let data = {
				slug: 'a-test-project'
			};

			/**
			 *	Run the function and then run the tests
			 */
			Blaze.renderWithData(Template.views_detail, data, testParent);
			expect(Meteor.subscribe).toHaveBeenCalledWith('projects', {'fields.slug': 'a-test-project'}, {onReady: jasmine.any(Function), onStop: jasmine.any(Function)});

			/**
			 *	Finished
			 */
			done();
		});

	});

	describe('helpers', () => {

		describe('projectItems', () => {
			it('should call find on the projectitems collection with the correct parameters', (done) => {
				/**
				 *	Spies
				 */
				spyOn(Core.collections.projectitems, 'find').and.returnValue({
					fetch: () => true
				});

				/**
				 *	Run the function and then the tests
				 */
				Template.views_detail.__helpers[' projectItems']();
				expect(Core.collections.projectitems.find).toHaveBeenCalledWith({}, {sort: {'sys.createdAt': 1}});

				/**
				 *	Finished
				 */
				done();
			});
		});
	});

});