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
					slug: 'a-test-project'
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

		describe('project', () => {
			it('should call findOne on the projects collection with the correct parameters', (done) => {
				/**
				 *	Spies
				 */
				spyOn(Core.collections.projects, 'findOne').and.returnValue({
					fields: {
						items: [{},{},{}]
					},
					sys: {}
				});

				/**
				 *	Dummy data
				 */
				let data = {
					slug: 'a-test-project'
				};

				/**
				 *	Run the function and then the tests
				 */
				Template.views_detail.__helpers[' project'].call(data);
				expect(Core.collections.projects.findOne).toHaveBeenCalledWith({'fields.slug': 'a-test-project'});

				/**
				 *	Finished
				 */
				done();
			});
		});
	});

});