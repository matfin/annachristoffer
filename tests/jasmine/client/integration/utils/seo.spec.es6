'use strict';

describe('Core', () => {

	describe('Seo', () => {

		beforeEach(() => {
			Core.seo.title			 	= 'Dummy title';
			Core.seo.description 	= 'Dummy description';
			Core.seo.image 			 	= 'http://image.jpg';
			Core.seo.url 				 	= 'http://url.tld';
			Core.seo.type					= 'dummy-type';
			Core.seo.head 				= document.head;
		});

		describe('refreshTwitter', () => {

			it('should update the twitter meta tags in the document head with the correct values', (done) => {
				/**
				 *	Run the function and then the tests
				 */
				Core.seo.refreshTwitter();

				expect(document.head.querySelectorAll('meta[name="twitter:title"]')[0].content).toEqual('Dummy title');
				expect(document.head.querySelectorAll('meta[name="twitter:description"]')[0].content).toEqual('Dummy description');
				expect(document.head.querySelectorAll('meta[name="twitter:image:src"]')[0].content).toEqual('http://image.jpg');
				expect(document.head.querySelectorAll('meta[name="twitter:url"]')[0].content).toEqual('http://url.tld');

				/**
				 *	Done
				 */
				done();
			});

		});

		describe('refreshOG', () => {

			it('should update the Open Graph meta tags in the document head with the correct values', (done) => {
				/**
				 *	Run the function and then the tests
				 */
				Core.seo.refreshOG();

				expect(document.head.querySelectorAll('meta[property="og:title"]')[0].content).toEqual('Dummy title');
				expect(document.head.querySelectorAll('meta[property="og:description"]')[0].content).toEqual('Dummy description');
				expect(document.head.querySelectorAll('meta[property="og:image"]')[0].content).toEqual('http://image.jpg');
				expect(document.head.querySelectorAll('meta[property="og:url"]')[0].content).toEqual('http://url.tld');
				expect(document.head.querySelectorAll('meta[property="og:type"]')[0].content).toEqual('dummy-type');

				/**
				 *	Done
				 */
				done();
			});

			describe('refreshMeta', () => {

				it('should update the html meta tags in the document head with the correct values', (done) => {
					/**
					 *	Run the function and then the tests
					 */
					Core.seo.refreshMeta();

					expect(document.head.querySelectorAll('title')[0].firstChild.nodeValue).toEqual('Dummy title');
					expect(document.head.querySelectorAll('meta[name="description"]')[0].content).toEqual('Dummy description');
					expect(document.head.querySelectorAll('link[rel="canonical"]')[0].content).toEqual('http://url.tld');

					/**
					 *	Done
					 */
					done();
				});
			});
		});
	});
});