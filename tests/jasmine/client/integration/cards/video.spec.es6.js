'use strict';

describe('cards_video', () => {

	let testParent;

	describe('template', () => {

		beforeEach(() => {
			testParent = document.createElement('div');
		});

		afterEach(() => {
			testParent = document.createElement('div');
		});

		it('should call subscribe on the images collection and then on the videos collection with the correct parameters and a callback', (done) => {
			/**
			 *	Spies
			 */
			spyOn(Meteor, 'subscribe').and.returnValue({
				ready: () => true
			});
			spyOn(Array.prototype, 'find').and.callFake(() => {
				return {
					sys: {
						id: 2
					}
				}
			});

			/**
			 *	Dummy data
			 */
			let data = {
				fields: {
					videoSource: 'abcdefg',
					images: []
				},
				sys: {
					id: 1
				},
				image: {
					sys: {
						id: 1
					}
				}
			};

			/**
			 *	Run the function and then the tests
			 */
			Blaze.renderWithData(Template.cards_video, data, testParent);
			expect(Meteor.subscribe.calls.argsFor(0)).toEqual(['videos', 'abcdefg', {onReady: jasmine.any(Function), onStop: jasmine.any(Function)}]);
			expect(Meteor.subscribe.calls.argsFor(1)).toEqual(['images', 2, {onStop: jasmine.any(Function)}]);

			/** 
			 *	Done
			 */
			done();
		});

		// it('should create a new Core video player instance', (done) => {
		// 	/**
		// 	 *	Spies
		// 	 */
		// 	spyOn(Meteor, 'autorun').and.callFake((cb) => {
		// 		cb();
		// 	});
		// 	spyOn(Meteor, 'subscribe').and.returnValue({
		// 		ready: () => true
		// 	});
		// 	spyOn($, 'get').and.callFake((index) => {
		// 		return document.createElement('i');
		// 	});
		// 	spyOn(Core.player.prototype, 'constructor').and.returnValue({});
		// 	spyOn(Array.prototype, 'find').and.callFake(() => {
		// 		return {
		// 			sys: {
		// 				id: 2
		// 			}
		// 		}
		// 	});

		// 	/**
		// 	 *	Dummy data
		// 	 */
		// 	let data = {
		// 		fields: {
		// 			videoSource: 'abcdefg',
		// 			images: []
		// 		},
		// 		sys: {
		// 			id: 1
		// 		},
		// 		image: {
		// 			sys: {
		// 				id: 1
		// 			}
		// 		}
		// 	};

		// 	/**
		// 	 *	Run the function and then the tests
		// 	 */
		// 	Blaze.renderWithData(Template.cards_video, data, testParent);
		// 	expect(Core.player.prototype.constructor).toHaveBeenCalled();

		// 	/**
		// 	 *	Done
		// 	 */
		// 	done();
		// });
	});

	describe('helpers', () => {
		
		describe('poster', () => {
			it('should call depend on the resized dependency and then call findOne on the images collection with the correct parameters', (done) => {
				/**
				 *	Spies
				 */
				spyOn(Dependencies.resized, 'depend').and.returnValue({});
				spyOn(Core.collections.images, 'findOne').and.returnValue({
					filename: 'dummy-image.jpg'
				});
				spyOn(Core.helpers, 'mediaUrl').and.returnValue('http://image.tld');
				spyOn(Device, 'reset').and.callFake(() => {
					Device.name = 'dummyname',
					Device.pixelRatio = 1
				});

				Device.reset();

				/**
				 *	Dummy data
				 */
				let data = {
					image: {
						sys: {
							id: 'dummy-1'
						} 
					}
				};

				/**
				 *	Call the function then run the tests
				 */
				expect(Template.cards_video.__helpers[' poster'].call(data)).toEqual('http://image.tld/dummy-image.jpg');
				expect(Dependencies.resized.depend).toHaveBeenCalled();
				expect(Core.collections.images.findOne).toHaveBeenCalledWith({
					'asset_id': 'dummy-1',
					'device': 'dummyname',
					'density.multiplier': 1
				});

				/**
				 *	Done
				 */
				done();
			});
		});
		
		describe('video', () => {
			it('should call depend on the resized dependency and then call find on the videos collection', (done) => {
				/**
				 *	Spies
				 */
				spyOn(Dependencies.resized, 'depend').and.returnValue({});
				spyOn(Core.collections.videos, 'findOne').and.returnValue({
					assets: [
						{
							contentType: 'TestVideoType',
							type: 'video/mp4'
						}
					]
				});
				spyOn(Core.helpers, 'wistiaVideoType').and.returnValue('TestVideoType');
				spyOn(Device, 'reset').and.callFake(() => {
					Device.name = 'desktop',
					Device.pixelRatio = 1
				});

				Device.reset();

				/**
				 *	Dummy data
				 */
				let data = {
					fields: {
						videoSource: 'abcdefg'
					}
				};

				/**
				 *	Call the function and run the tests
				 */
				Template.cards_video.__helpers[' video'].call(data);
				expect(Dependencies.resized.depend).toHaveBeenCalled();
				expect(Core.collections.videos.findOne).toHaveBeenCalledWith({'hashed_id': 'abcdefg'});
				expect(Core.helpers.wistiaVideoType).toHaveBeenCalledWith('desktop');

				/**
				 *	Done
				 */
				done();
			});
		
			it('should return the correct video asset given device parameters', (done) => {
				/**
				 *	Spies
				 */
				spyOn(Core.collections.videos, 'findOne').and.returnValue({
					assets: [
						{contentType: 'video/mp4', type: 'HdMp4VideoFile', url: 'http://video.src/item-hd.bin'},
						{contentType: 'video/mp4', type: 'IphoneVideoFile', url: 'http://video.src/item-sd.bin'}
					]
				});	
				spyOn(Core.helpers, 'wistiaVideoType').and.returnValue('HdMp4VideoFile');

				/**
				 *	Dummy data
				 */
				let data = {
					fields: {
						videoSource: 'abcdefg'
					}
				};

				/**
				 *	Call the function and then run the tests
				 */
				expect(Template.cards_video.__helpers[' video'].call(data)).toEqual({contentType: 'video/mp4', type: 'HdMp4VideoFile' , url: 'http://video.src/item-hd.bin'});

				/**
				 *	Done
				 */
				done();
			});

			it('should return immediately if no matching videos were found', (done) => {
				/**
				 *	Spies
				 */
				spyOn(Core.collections.videos, 'findOne').and.returnValue({
					assets: [
						{contentType: 'video/mp4', type: 'IphoneVideoFile', url: 'http://video.src/item-sd.bin'}
					]
				});	
				spyOn(Core.helpers, 'wistiaVideoType').and.returnValue('HdMp4VideoFile');

				/**
				 *	Dummy data
				 */
				let data = {
					fields: {
						videoSource: 'abcdef'
					}
				};

				/**
				 *	Call the function and then run the tests
				 */
				expect(Template.cards_video.__helpers[' video'].call(data)).toBeUndefined();

				/**
				 *	Done
				 */
				done();
			});
	
		});

	});

});