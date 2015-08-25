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
			 *	Note: When a template calls subscribe, it will call
			 *				a stop on the handle when it is destroyed, so the
			 *				onStop function is called even though it is not 
			 *				in as an argument in the template controller
			 */
			Blaze.render(Template.partials_header, testParent);
			expect(Meteor.subscribe).toHaveBeenCalledWith('entries', 'Project Category', {onStop: jasmine.any(Function)});

			/**
			 *	Finished
			 */
			done();
		});

	});

	describe('helpers', () => {
		describe('categories', () => {
			it('should call find on the entries collection with the correct parameters when the device is not a mobile device', (done) => {
				/**
				 *	Spies
				 */
				spyOn(Core.collections.entries, 'find').and.returnValue({});
				spyOn(Device, 'reset').and.callFake(() => {
					Device.isMobile = false;
				});

				/** 
				 *	Reset the device
				 */
				Device.reset();
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
	
			it('should not call find on the entries collection if the device is a mobile device', (done) => {
				/**
				 *	Spies
				 */
				spyOn(Core.collections.entries, 'find').and.returnValue({});
				spyOn(Device, 'reset').and.callFake(() => {
					Device.isMobile = true;
				});

				/** 
				 *	Reset the device
				 */
				Device.reset();
				/**
				 *	Run the function and then test
				 */
				Template.partials_header.__helpers[' categories']();
				expect(Core.collections.entries.find).not.toHaveBeenCalled();
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

		describe('top', () => {
			it('should call depend on the scrolled Dependency', (done) => {
				/**
				 *	Spies
				 */
				spyOn(Dependencies.scrolled, 'depend').and.returnValue({});

				/**
				 *	Call the function and then run the tests
				 */
				Template.partials_header.__helpers[' top'].call({});
				expect(Dependencies.scrolled.depend).toHaveBeenCalled();

				/**
				 *	Done
				 */
				done();
			});

			it('should return a number', (done) => {
				/**
				 *	Call the function and then run the tests
				 */
				expect(Template.partials_header.__helpers[' top'].call({})).toEqual(jasmine.any(Number));
				/**
				 *	Done
				 */
				done();
			});

		});
	});	
});