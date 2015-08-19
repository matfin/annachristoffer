'use strict';

describe('cards_preview_tile', () => {

	let testParent;

	describe('template', () => {

		beforeEach(() => {

		});

		afterEach(() => {

		});

		it('should subscribe to the images collection with the correct parameters', (done) => {

			/**
			 *	Spies
			 */
			spyOn(Meteor, 'subscribe').and.returnValue({
				subscriptionId: 2,
				ready: () => true
			});

			/**
			 *	Dummy data 
			 */
			let data = {
				fields: {
					previewImage: {
						sys: {
							id: 'preview-12345'
						}
					}
				}
			};

			/**
			 *	Call render and then run the test
			 */
			Blaze.render(Template.cards_preview_tile, testParent);
			expect(Meteor.subscribe).toHaveBeenCalledWith('images', 'preview-12345');

			/**
			 *	Finished
			 */
			done();
		});

	});

});