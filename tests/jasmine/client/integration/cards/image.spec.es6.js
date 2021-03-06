'use strict';

describe('cards_image', () => {

	let testParent;

	describe('template', () => {

		beforeEach(() => {
			testParent = document.createElement('div');
		});

		afterEach(() => {
			testParent = document.createElement('div');
		});

		it('should call subscribe on the images collection with the correct parameters', (done) => {
			/**
			 *	Spies
			 */
			spyOn(Meteor, 'subscribe').and.returnValue({
				subscriptionId: 4,
				ready: () => true
			});

			/**
			 *	Dummy data 
			 */
			let data = {
				fields: {},
				sys: {
					id: 'dummy-6789'
				}
			};

			/**
			 *	Call the function and run the tests
			 */
			Blaze.renderWithData(Template.cards_image, data, testParent);
			expect(Meteor.subscribe).toHaveBeenCalledWith('images', 'dummy-6789', {onReady: jasmine.any(Function), onStop: jasmine.any(Function)});

			/**
			 *	Finished
			 */
			done();
		});

	});

	describe('helpers', () => {

		describe('image', () => {
			it('should call find on the images collection with the correct parameters given the device parameters', (done) => {
			
				afterEach(() => {
					Device.reset();
				});

				/**
				 *	Spies
				 */
				spyOn(Core.collections.images, 'findOne').and.returnValue({});

				/**
				 *	Dummy data
				 */
				let data = {
					sys: {
						id: 'dummy-5678'
					},
				};

				/**
				 *	Stubbing the device class helper, running the function and then the tests
				 */
				Device.pixelRatio = 1;
				Device.name = 'desktop';
				Template.cards_image.__helpers[' image'].call(data);
				expect(Core.collections.images.findOne).toHaveBeenCalledWith({'asset_id': 'dummy-5678', 'device': 'desktop', 'density.multiplier': 1});

				/**
				 *	Finished
				 */
				done();
			});

			it('should call depend on the resized tracker dependency', (done) => {
				/**
				 *	Spies
				 */
				spyOn(Dependencies.resized, 'depend').and.returnValue({});
				spyOn(Core.collections.images, 'findOne').and.returnValue({filename: 'file-123.jpg'});
				/**
				 *	Dummy data
				 */
				let data = {
					sys: {
						id: 1
					}
				};
				/**
				 *	Run the function and then the tests
				 */
				Template.cards_image.__helpers[' image'].call(data);
				expect(Dependencies.resized.depend).toHaveBeenCalled();
				/**
				 *	Finished
				 */
				done();
			});

			it('should return the correct image url', (done) => {
				/**
				 *	Spies
				 */
				spyOn(Core.collections.images, 'findOne').and.returnValue({filename: 'file-123.jpg'});
				spyOn(Core.helpers, 'mediaUrl').and.callFake(() => 'http://www.somewhere.tld');
				/**
				 *	Dummy data
				 */
				let data = {
					sys: {
						id: 1
					}
				};
				/**
				 *	Run the function and then the tests
				 */
				expect(Template.cards_image.__helpers[' image'].call(data)).toEqual('http://www.somewhere.tld/file-123.jpg');
				/**
				 *	Finished
				 */
				done();
			});	

			it('should return immediately if image is undefined', (done) => {
				/**
				 *	Spies
				 */
				spyOn(Core.collections.images, 'findOne').and.callFake(() => undefined);
				spyOn(Core.helpers, 'mediaUrl').and.callFake(() => 'http://www.somewhere.tld');
				/**
				 *	Dummy data
				 */
				let data = {
					sys: {
						id: 1
					}
				};
				/**
				 *	Run the function and then the tests
				 */
				expect(Template.cards_image.__helpers[' image'].call(data)).toBeUndefined();
				/**
				 *	Finished
				 */
				done();
			});				

		});
	});

});