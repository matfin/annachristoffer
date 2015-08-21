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

	describe('active', () => {

		it('should return the correct classname string if the project category matches that in the router slug', (done) => {
			/**
			 *	Spies
			 */
			spyOn(Router, 'current').and.returnValue({
				params: {
					_slug: 'a-category-slug'
				}
			});

			/**
			 *	Dummy data
			 */
			let data = {
				fields: {
					slug: 'a-category-slug'
				}
			};

			/**
			 *	Run the function and the test
			 */
			expect(Template.partials_header.__helpers[' active'].call(data)).toEqual('header__navigation__list__item__link--active');

			/**
			 *	Finished
			 */
			done();
		});

		it('should return an empty string if the project category does not match that in the router slug', (done) => {
			/**
			 *	Spies
			 */
			spyOn(Router, 'current').and.returnValue({
				params: {
					_slug: 'another-category-slug'
				}
			});

			/**
			 *	Dummy data
			 */
			let data = {
				fields: {
					slug: 'a-category-slug'
				}
			};

			/**
			 *	Run the function and the test
			 */
			expect(Template.partials_header.__helpers[' active'].call(data)).toEqual('');

			/**
			 *	Finished
			 */
			done();
		});

	});

});