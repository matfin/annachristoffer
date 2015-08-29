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

		describe('thumbnail', () => {
			it('should call imgSource on core helpers with the correct parameters', (done) => {
				/**
				 *	Spies
				 */
				spyOn(Core.helpers, 'imgSource').and.returnValue({});

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
				Template.cards_preview_tile.__helpers[' thumbnail'].call(data);
				expect(Core.helpers.imgSource).toHaveBeenCalledWith('preview-12345');

				/**
				 *	Finished
				 */
				done();
			});
		});

		describe('highlighted', () => {
			it('should return the correct classname if the current category matches one of those in the project',  (done) => {
				/**
				 *	Spies
				 */
				spyOn(Router, 'current').and.returnValue({
					params: {
						_slug: 'dummy-category'
					}
				});

				/**
				 *	Dummy data
				 */
				let data = {
					fields: {
						categories: [
							{
								fields: {
									slug: 'dummy-category'
								}
							},
							{
								fields: {
									slug: 'another-dummy-category'
								}
							}
						]
					}
				};

				/**
				 *	Run the function and then the tests
				 */
				expect(Template.cards_preview_tile.__helpers[' highlighted'].call(data)).toEqual('preview__tile__flip__front--highlighted');

				/**
				 *	Finished
				 */
				done();
			});
		});

		describe('highlighted', () => {
			it('should return an empty string if the current category does not matche one of those in the project',  (done) => {
				/**
				 *	Spies
				 */
				spyOn(Router, 'current').and.returnValue({
					params: {
						_slug: 'another-category'
					}
				});

				/**
				 *	Dummy data
				 */
				let data = {
					fields: {
						categories: [
							{
								fields: {
									slug: 'dummy-category'
								}
							},
							{
								fields: {
									slug: 'another-dummy-category'
								}
							}
						]
					}
				};
				/**
				 *	Run the function and then the tests
				 */
				expect(Template.cards_preview_tile.__helpers[' highlighted'].call(data)).toEqual('');

				/**
				 *	Finished
				 */
				done();
			});
		});

		describe('highlighted', () => {
			it('should return immediately if the project has no categories at all',  (done) => {
				/**
				 *	Spies
				 */
				spyOn(Router, 'current').and.returnValue({
					params: {
						_slug: 'another-category'
					}
				});

				/**
				 *	Dummy data
				 */
				let data = {
					fields: {}
				};
				/**
				 *	Run the function and then the tests
				 */
				expect(Template.cards_preview_tile.__helpers[' highlighted'].call(data)).toBeUndefined();

				/**
				 *	Finished
				 */
				done();
			});
		});

	});

});