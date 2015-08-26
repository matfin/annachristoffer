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
			 *	Render the template and then run the tests
			 */
			Blaze.render(Template.views_content, testParent);
			expect(Meteor.subscribe.calls.argsFor(0)).toEqual(['entries', 'Content Item', {onStop: jasmine.any(Function)}]);
			expect(Meteor.subscribe.calls.argsFor(1)).toEqual(['entries', 'Experience', {onStop: jasmine.any(Function)}]);

			/**
			 *	Done
			 */
			done();
		});

	});
});