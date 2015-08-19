'use strict';

describe('cards_preview_tile', () => {

	let testParent;

	describe('template', () => {

		beforeEach(() => {
			testParent = document.createElement('div');
		});

		afterEach(() => {
			testParent = document.createElement('div');
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
			Blaze.renderWithData(Template.cards_preview_tile, data, testParent);
			expect(Meteor.subscribe).toHaveBeenCalledWith('images', 'preview-12345');

			/**
			 *	Finished
			 */
			done();
		});

	});

	describe('helpers', () => {

		it('should call find on the images collection with the correct parameters', (done) => {

			/**
			 *	Spies
			 */
			spyOn(Core.collections.images, 'findOne').and.returnValue({});

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
			 *	Call the function and run the test
			 */
			Template.cards_preview_tile.__helpers[' thumbnails'].call(data);
			expect(Core.collections.images.findOne).toHaveBeenCalledWith({asset_id: 'preview-12345'});

			/**
			 *	Finished
			 */
			done();
		});

	});

});