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
				let lazyLoadCallback = jasmine.createSpy('lazyLoadCallback');
				spyOn(Core.helpers, 'isVisible').and.returnValue(true);

				/**
				 *	Dummy node
				 */
				var node = document.createElement('img');
				node.setAttribute('data-src', 'http://img.tld/img.jpg');
				node.setAttribute('src', 'http://img.tld/img.jpg');

				/** 
				 *	Run the function
				 */
				Core.helpers.lazyLoad(node).then(function() {
					lazyLoadCallback();
				});

				/**
				 *	Then test that the lazyload callback was not run
				 */
				expect(lazyLoadCallback.calls.any()).toEqual(false);

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

		describe('imgSource', function() {

			var asset, images;

			beforeEach(function() {
				asset = {
					sys: {
						id: 'dummy-asset-id-1'
					}
				};
				images = [
					{ asset_id: 'dummy-asset-id-1', density: {multiplier: 1, prefixed: ''}, device: 'desktop', filename: 'dummy-asset-id-1-desktop.jpg', filetype: 'jpg' },
					{ asset_id: 'dummy-asset-id-1', density: {multiplier: 2, prefixed: '@2x'}, device: 'desktop', filename: 'dummy-asset-id-1-desktop@2x.jpg', filetype: 'jpg' },
					{ asset_id: 'dummy-asset-id-1', density: {multiplier: 3, prefixed: '@3x'}, device: 'desktop', filename: 'dummy-asset-id-1-desktop@3x.jpg', filetype: 'jpg' },
					{ asset_id: 'dummy-asset-id-1', density: {multiplier: 1, prefixed: ''}, device: 'tablet', filename: 'dummy-asset-id-1-tablet.jpg', filetype: 'jpg' },
					{ asset_id: 'dummy-asset-id-1', density: {multiplier: 2, prefixed: '@2x'}, device: 'tablet', filename: 'dummy-asset-id-1-tablet@2x.jpg', filetype: 'jpg' },
					{ asset_id: 'dummy-asset-id-1', density: {multiplier: 3, prefixed: '@3x'}, device: 'tablet', filename: 'dummy-asset-id-1-tablet@3x.jpg', filetype: 'jpg' },
					{ asset_id: 'dummy-asset-id-1', density: {multiplier: 1, prefixed: ''}, device: 'mobile', filename: 'dummy-asset-id-1-mobile.jpg', filetype: 'jpg' },
					{ asset_id: 'dummy-asset-id-1', density: {multiplier: 2, prefixed: '@2x'}, device: 'mobile', filename: 'dummy-asset-id-1-mobile@2x.jpg', filetype: 'jpg' },
					{ asset_id: 'dummy-asset-id-1', density: {multiplier: 3, prefixed: '@3x'}, device: 'mobile', filename: 'dummy-asset-id-1-mobile@3x.jpg', filetype: 'jpg' }
				];
			});

			afterEach(function() {
				Device.reset();
			});

			it('should return the correct image from the collection given an asset and some device parameters', function(done) {
				/**
				 *	Spies
				 */
				spyOn(Core.collections.images, 'findOne').and.callFake(function(selector) {
					return images.find(function(image) {
						return selector.asset_id === image.asset_id && selector.device === image.device && selector['density.multiplier'] === image.density.multiplier;
					});
				});
				spyOn(Core.helpers, 'mediaUrl').and.returnValue('http://somewhere.tld');

				/**
				 *	Set the device parameters, all the function and run the tests
				 */
				Device.name = 'desktop';
				Device.pixelRatio = 1;
				expect(Core.helpers.imgSource(asset.sys.id)).toEqual('http://somewhere.tld/dummy-asset-id-1-desktop.jpg');

				Device.name = 'tablet';
				Device.pixelRatio = 3;
				expect(Core.helpers.imgSource(asset.sys.id)).toEqual('http://somewhere.tld/dummy-asset-id-1-tablet@3x.jpg');

				Device.name = 'mobile';
				Device.pixelRatio = 2;
				expect(Core.helpers.imgSource(asset.sys.id)).toEqual('http://somewhere.tld/dummy-asset-id-1-mobile@2x.jpg');

				Device.name = 'calculator-watch';
				Device.pixelRatio = 4;
				expect(Core.helpers.imgSource(asset.sys.id)).toBeUndefined();

				/**
				 *	Run the test but override what the current device is
				 */
				Device.name = 'mobile';
				Device.pixelRatio = 2;
				expect(Core.helpers.imgSource(asset.sys.id, 'desktop')).toEqual('http://somewhere.tld/dummy-asset-id-1-desktop@2x.jpg');

				/**
				 *	Done
				 */
				done();
			});

		});

	});

});