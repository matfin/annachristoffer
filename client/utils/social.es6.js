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

}