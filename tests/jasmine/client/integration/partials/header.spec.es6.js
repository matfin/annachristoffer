'use strict';

describe('partials_header', () => {

	let testParent;

	describe('template', () => {

		beforeEach(() => {
			testParent = document.createElement('div');
		});

		afterEach(() => {
			testParent = document.createElement('div');
		});

		it('should call subscribe on the entries collection with the correct parameters', (done) => {
			/**
			 *	Spies
			 */
			spyOn(Meteor, 'subscribe').and.returnValue({
				subscriptionId: 5,
				ready: () => true
			});

			/**
			 *	Call the render function and run the test
			 */
			Blaze.render(Template.partials_header, testParent);
			expect(Meteor.subscribe).toHaveBeenCalledWith('entries', 'Project Category');

			/**
			 *	Finished
			 */
			done();
		});

	});

	describe('helpers', () => {

		it('should call find on the entries collection with the correct parameters', (done) => {
			/**
			 *	Spies
			 */
			spyOn(Core.collections.entries, 'find').and.returnValue({});
			/**
			 *	Run the function and then test
			 */
			Template.partials_header.__helpers[' categories']();
			expect(Core.collections.entries.find).toHaveBeenCalledWith({contentTypeName: 'Project Category'});

			/**
			 *	Done
			 */
			done();
		});

	});

});