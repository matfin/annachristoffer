'use stricr';

/**
 *	Client side class to handle sharing of content on social media networks
 *	
 *	@class Social
 */
Core.social = {

	facebook: class Facebook {

		/**
		 *	Function to initialise the Facebook SDK
		 *	
		 *	@method init
		 */
		static init() {
			window.fbAsyncInit = () => {
				FB.init({
					appId: 		Meteor.settings.public.facebook.appId,
					xfbml: 		true,
					version: 	'v2.4',
					status: 	true
				});
				this.ready = true;
			};

			((d, s, id) => {
				let js, fjs = d.getElementsByTagName(s)[0];
				if(d.getElementById(id)) return;
				js 			= d.createElement(s);
				js.id 	= id;
				js.src 	= '//connect.facebook.net/en_US/sdk.js';
				fjs.parentNode.insertBefore(js, fjs); 
			})(document, 'script', 'facebook-jssdk');
		}
	},

	google: class Google {
		/**
		 *	Function to initialise Google Analytics
		 *	
		 *	@method init
		 */
		static init() {
			((i, s, o, g, r, a, m) => {
				i['GoogleAnalyticsObject'] = r;
				i[r] = i[r] || () => {
					(i[r].q = i[r].q || []).push(arguments)
				},
				i[r].l = 1 * new Date();
				a = s.createElement(o),
				m = s.getElementsByTagName(o)[0];
				a.async = 1;
				a.src = g;
				m.parentNode.insertBefore(a,m);
			})(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

			if(Meteor.settings.public.google) {
				ga('create', Meteor.settings.public.google.ua, 'auto');
				this.ready = true;
			}
			else {
				this.ready = false;
			}
		}

		/**
		 *	Function to fetch data and track a page view given a slug
		 *
		 *	@method trackContentView
		 *	@param {String} slug - the slug for the 
		 */
		static trackContentView(slug) {
			let page = Core.collections.entries.findOne({contentTypeName: 'Page', 'fields.slug': slug});
			ga('send', 'pageview', {
				page: `/content/${page.fields.slug}`,
				title: page.fields.title
			});
		}

		static trackProjectView(slug) {
			let project = Core.collections.entries.findOne({contentTypeName: 'Project', 'fields.slug': slug});
			ga('send', 'pageview', {
				page: `/project/${project.fields.slug}`,
				title: project.fields.title
			});
		}

		static trackCategoryView(slug) {
			let category = Core.collections.entries.findOne({contentTypeName: 'Project Category', 'fields.slug': slug});
			ga('send', 'pageview', {
				page: 	typeof category !== 'undefined' ? `/${category.fields.slug}` : '/',
				title: 	typeof category !== 'undefined' ? category.fields.title : 'All Projects'
			});
		}
	},

	pinterest: class Pinterest {
		/**
		 *	Function to initialise the Pinterest SDK
		 *	
		 *	@method init
		 */
		static init() {
			window.pAsyncInit = () => {
				PDK.init({
					appId: Meteor.settings.public.pinterest.appId,
					cookie: true
				});
				this.ready = true;
			};

			((d, s, id) => {
				let js, pjs = document.getElementsByTagName(s)[0];
				if(d.getElementById(id)) return;
				js 			= d.createElement(s);
				js.id 	= id;
				js.src 	= '//assets.pinterest.com/sdk/sdk.js';
				pjs.parentNode.insertBefore(js, pjs);  
			})(document, 'script', 'pinterest-jssdk');
		}
	}
};