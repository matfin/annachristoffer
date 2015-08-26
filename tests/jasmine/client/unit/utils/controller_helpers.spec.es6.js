'use strict';
/**
 *	Note: For some reason, client side unit testing will not compile 
 *				in ES6 - need to use ES5 instead
 */
describe('Core', function() {

	describe('Helpers', function() {
			
		describe('lazyLoad', function() {

			it('should return immediately if an image node being passed in has already loaded', function(done) {
				/**
				 *	Spies
				 */
				spyOn(Core.helpers, 'isVisible').and.returnValue(true);

				/**
				 *	Dummy node
				 */
				var node = document.createElement('img');
				node.setAttribute('data-src', 'http://img.tld/img.jpg');
				node.setAttribute('src', 'http://img.tld/img.jpg');

				/** 
				 *	Run the test
				 */
				expect(Core.helpers.lazyLoad(node)).toBeUndefined();

				/**
				 *	Done
				 */
				done();
			});

			it('should return a callback function if an image node being passed in has not been loaded', function(done) {
				/** 
				 *	Spies
				 */
				spyOn(Core.helpers, 'isVisible').and.returnValue(true);

				/**
				 *	Dummy node
				 */
				var node = document.createElement('img');
				node.setAttribute('data-src', 'http://img.tld/img.jpg');

				/**
				 *	Run the test
				 */
				expect(Core.helpers.lazyLoad(node)).toEqual({then: jasmine.any(Function)});

				/**
				 *	Done
				 */
				done();
			});
		});

		describe('wistiaVideoType', function() {

			beforeEach(function() {
				Device.reset();
			})

			it('should return the correct video file type given device parameters', function(done) {
				/**
				 *	Set the device name and run the tests
				 */
				Device.name = 'desktop';
				expect(Core.helpers.wistiaVideoType()).toEqual('HdMp4VideoFile');

				Device.name = 'tablet'
				expect(Core.helpers.wistiaVideoType()).toEqual('Mp4VideoFile');

				Device.name = 'mobile'
				expect(Core.helpers.wistiaVideoType()).toEqual('IphoneVideoFile');

				Device.name = 'default'
				expect(Core.helpers.wistiaVideoType()).toEqual('IphoneVideoFile');

				/**
				 *	Done
				 */
				done();
			});
		});

	});

});