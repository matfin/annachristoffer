'use strict';

describe('Core', function() {
	describe('Seo', function() {

		describe('run', function() {
			var data;

			beforeEach(function() {
				data = {
					title: 'A title',
					description: 'A description',
					image: 'http://img.jpg',
					type: 'type',
					url: 'http://url.tld'
				};
			});

			afterEach(function() {
			});

			it('should set the correct keys for the object given some data', function(done) {
				/** 
				 *	Run the function
				 */
				Core.seo.run(data);

				expect(Core.seo.title).toEqual('A title');
				expect(Core.seo.description).toEqual('A description');
				expect(Core.seo.image).toEqual('http://img.jpg');
				expect(Core.seo.type).toEqual('type');
				expect(Core.seo.url).toEqual('http://url.tld');

				/**
				 *	Finished
				 */
				done();
			});

			it('should call all functions to refresh the meta tags', function(done) {
				/**
				 *	Spies
				 */
				spyOn(Core.seo, 'refreshTwitter').and.returnValue(Core.seo);
				spyOn(Core.seo, 'refreshOG').and.returnValue(Core.seo);
				spyOn(Core.seo, 'refreshMeta').and.returnValue(Core.seo);
				spyOn(Core.seo, 'ready').and.returnValue(Core.seo);

				/**
				 *	Call the function and run the tests
				 */
				Core.seo.run(data);
				expect(Core.seo.refreshTwitter).toHaveBeenCalled();
				expect(Core.seo.refreshOG).toHaveBeenCalled();
				expect(Core.seo.refreshMeta).toHaveBeenCalled();
				expect(Core.seo.ready).toHaveBeenCalled();

				/**
				 *	Finished
				 */
				done();
			});

		});
	
		describe('refreshFromProject', function() {

			it('Call find on the projects collection with the correct parameters and then return immediately when the project is undefined', function(done) {
				/**
				 *	Spies
				 */
				spyOn(Core.collections.projects, 'findOne').and.returnValue(undefined);
				/**
				 *	Run the function and then the tests
				 */
				expect(Core.seo.refreshFromProject('dummy-slug')).toBeUndefined();
				expect(Core.collections.projects.findOne).toHaveBeenCalledWith({'fields.slug': 'dummy-slug'});
				/**
				 *	Done
				 */
				done();
			});

			it('should call subscribe on the images collection with the correct parameters and then call the run function when the project is not undefined', function(done) {
				/**
				 *	Spies
				 */
				spyOn(Core.helpers, 'imgSource').and.returnValue('http://image.jpg');

				spyOn(Core.collections.projects, 'findOne').and.returnValue({
					fields: {
						title: 'Dummy Title',
						description: 'Dummy description',
						slug: 'dummy-slug',
						previewImage: {
							sys: {
								id: 'dummy-asset-id-1'
							}
						}
					}
				});
				spyOn(Meteor, 'subscribe').and.callFake(function(collection, selector, callback) {
					callback();
					return {
						stop: function() {},
						ready: function() {
							console.log('ITS READY')
						}
					};
				});
				spyOn(Core.seo, 'run').and.returnValue({});
	
				/**
				 *	Run the function and then the tests
				 */
				Core.seo.refreshFromProject('dummy-slug');
				expect(Meteor.subscribe).toHaveBeenCalledWith('images', 'dummy-asset-id-1', jasmine.any(Function));
				expect(Core.seo.run).toHaveBeenCalledWith({
					title: 'Anna Claire Christoffer - Dummy Title',
					description: 'Dummy description',
					image: 'http://image.jpg',
					url: jasmine.any(String),
					type: 'article'
				});

				/**
				 *	Done
				 */
				done();
			});

			it('should call the run function when the project is not undefined but the asset is undefined because there is no preview image', function(done) {
				/**
				 *	Spies
				 */
				spyOn(Core.collections.projects, 'findOne').and.returnValue({
					fields: {
						title: 'Dummy Title',
						description: 'Dummy description',
						slug: 'dummy-slug'
					}
				});
				spyOn(Core.seo, 'run').and.returnValue({});
	
				/**
				 *	Run the function and then the tests
				 */
				Core.seo.refreshFromProject('dummy-slug');
				expect(Core.seo.run).toHaveBeenCalledWith({
					title: 'Anna Claire Christoffer - Dummy Title',
					description: 'Dummy description',
					url: jasmine.any(String),
					type: 'article'
				});

				/**
				 *	Done
				 */
				setTimeout(done, 50);
			});

		});

		describe('refreshFromPage', function() {

			it('Call find on the pages collection with the correct parameters and then return immediately when the page is undefined', function(done) {
				/**
				 *	Spies
				 */
				spyOn(Core.collections.pages, 'findOne').and.returnValue(undefined);
				/**
				 *	Run the function and then the tests
				 */
				expect(Core.seo.refreshFromPage('dummy-slug')).toBeUndefined();
				expect(Core.collections.pages.findOne).toHaveBeenCalledWith({'fields.slug': 'dummy-slug'});
				/**
				 *	Done
				 */
				done();
			});

			it('should call subscribe on the images collection with the correct parameters and then call the run function when the page is not undefined', function(done) {
				/**
				 *	Spies
				 */
				spyOn(Core.helpers, 'imgSource').and.returnValue('http://image.jpg');

				spyOn(Core.collections.pages, 'findOne').and.returnValue({
					fields: {
						title: 'Dummy Title',
						description: 'Dummy description',
						slug: 'dummy-slug',
						images: [
							{
								fields: {
									description: 'seo',
									title: 'A dummy title'
								},
								sys: {
									id: 'dummy-asset-id-1'
								}
							}
						]
					}
				});
				spyOn(Meteor, 'subscribe').and.callFake(function(collection, selector, callback) {
					callback();
					return {
						stop: function() {},
						ready: function() {}
					};
				});
				spyOn(Core.seo, 'run').and.returnValue({});
	
				/**
				 *	Run the function and then the tests
				 */
				Core.seo.refreshFromPage('dummy-slug');
				expect(Meteor.subscribe).toHaveBeenCalledWith('images', 'dummy-asset-id-1', jasmine.any(Function));
				expect(Core.seo.run).toHaveBeenCalledWith({
					title: 'Dummy Title',
					description: 'Dummy description',
					image: 'http://image.jpg',
					url: jasmine.any(String),
					type: 'website'
				});

				/**
				 *	Done
				 */
				done();
			});

			it('should call the run function when the project is not undefined but the asset is undefined becuase there is no preview image', function(done) {
				/**
				 *	Spies
				 */

				spyOn(Core.collections.pages, 'findOne').and.returnValue({
					fields: {
						title: 'Dummy Title',
						description: 'Dummy description',
						slug: 'dummy-slug'
					}
				});
				spyOn(Core.seo, 'run').and.returnValue({});
	
				/**
				 *	Run the function and then the tests
				 */
				Core.seo.refreshFromPage('dummy-slug');
				expect(Core.seo.run).toHaveBeenCalledWith({
					title: 'Dummy Title',
					description: 'Dummy description',
					url: jasmine.any(String),
					type: 'website'
				});

				/**
				 *	Done
				 */
				done();
			});

		});
	
	});

});