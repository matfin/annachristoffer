'use strict';

describe('cards_caption', () => {

	let testParent;

	describe('template', () => {

		beforeEach(() => {
			testParent = document.createElement('div');
		});

		afterEach(() => {
			testParent = document.createElement('div');
		});

		xit('should', (done) => {

			/**
			 *	Finished
			 */
			done();
		});

	});

	describe('helpers', () => {

		describe('hasText', () => {
			it('should return true for hasText if there are paragrahs present in the item, or false if not', (done) => {
				/**
				 *	Dummy data
				 */
				let with_p = {
					fields: {
						paragraphs: '<p>Markdown!</p>'
					}
				},

				no_p = {
					fields: {
						images: {},
						others: []
					}
				};

				/**
				 *	Run the function and then the tests
				 */
				expect(Template.cards_caption.__helpers[' hasText'].call(with_p)).toBe(true);
				expect(Template.cards_caption.__helpers[' hasText'].call(no_p)).toBe(false);

				/**
				 *	Finished
				 */
				done();
			});
		});

		describe('useSlider', () => {
			it('should return true if there is more than one image present, or false', (done) => {
				/**
				 *	Dummy data
				 */
				let many_images = {
					fields: {
						images: [{},{},{}]
					}
				},

				one_image = {
					fields: {
						images: [{}]
					}
				};

				/**
				 *	Run the function and then the tests
				 */
				expect(Template.cards_caption.__helpers[' useSlider'].call(many_images)).toBe(true);
				expect(Template.cards_caption.__helpers[' useSlider'].call(one_image)).toBe(false);

				/**
				 *	Finished
				 */
				done();
			});
		});

	});

});