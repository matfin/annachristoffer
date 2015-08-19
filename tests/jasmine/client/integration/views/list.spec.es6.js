'use strict';

describe('views_list', () => {

	describe('template', () => {
		
		let parent = document.createElement('div');

		beforeEach(() => {
			parent = document.createElement('div');
		});

		afterEach(() => {
			while(parent.firstChild) {
				parent.removeChild(parent.firstChild);
			}
		});

		it('should call the Meteor subscribe function with the correct parameters', (done) => {
			/**
			 *	Spies
			 */
			spyOn(Meteor, 'subscribe').and.returnValue({
				subscriptionId: 1,
				ready: () => { return true; }
			});

			/**
			 *	Call render and then run the tests
			 */
			Blaze.render(Template.views_list, parent);
			expect(Meteor.subscribe).toHaveBeenCalledWith('entries', 'Project');

			/**
			 *	Finish
			 */
			done();
		});

	});

	describe('helpers', () => {

		it('should call find on the entries collection with the correct parameters', (done) => {

			/**
			 *	Spies
			 */
			spyOn(Core.collections.entries, 'find').and.returnValue({
				fetch: () => {
					return true;
				}
			});

			/**
			 *	Call the helper function and run the test
			 */
			Template.views_list.__helpers[' projects']();
			expect(Core.collections.entries.find).toHaveBeenCalledWith({contentTypeName: 'Project'});

			/**
			 *	Finished
			 */
			done();
		});

	});

});