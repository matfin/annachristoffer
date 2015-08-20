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

		it('should subscribe to the entries collection with the correct parameters', (done) => {
			/**
			 *	Spies
			 */
			spyOn(Meteor, 'subscribe').and.returnValue({
				subscriptionId: 3,
				ready: () => true	
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
			expect(Meteor.subscribe).toHaveBeenCalledWith('entries', 'Project', {'fields.slug': 'a-test-project'});

			/**
			 *	Finished
			 */
			done();
		});

	});

	describe('helpers', () => {

		describe('project', () => {
			it('should call find on the entries collection with the correct parameters', (done) => {
				/**
				 *	Spies
				 */
				spyOn(Core.collections.entries, 'findOne').and.returnValue({
					fetch: () => true
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
				expect(Core.collections.entries.findOne).toHaveBeenCalledWith({'fields.slug': 'a-test-project'});

				/**
				 *	Finished
				 */
				done();
			});
		});
	});

});