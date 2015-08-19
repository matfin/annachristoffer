'use strict';

describe('Template', () => {

	describe('views_list', () => {
		
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

});