'use strict';

describe('cards_slider', () => {

	let testParent;

	describe('template', () => {
		beforeEach(() => {
			testParent = document.createElement('div');
		});

		afterEach(() => {
			testParent = document.createElement('div');
		});
	});

	describe('helpers', () => {
		describe('sliderWidth', () => {
			it('should return the correct slider width given a number of images', (done) => {
				/**
				 *	Dummy data
				 */
				let data = {
					fields: {
						images: [{},{},{},{}]
					}
				};
				/**
				 *	Run the function and then call the tests
				 */
				expect(Template.cards_slider.__helpers[' sliderWidth'].call(data)).toEqual(400);
				/**
				 *	Done
				 */
				done();
			});
		});
	});

});