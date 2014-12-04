/**
 *	Social class to handle social interaction with the site: ie Facebook sharing
 *
 *	@class Social
 *	@static
 */
Social = {

	Facebook: {
		/**
		 *	Facebook APP ID for sharing content
		 *	
		 *	@property facebookAppId
		 *	@type {String}
		 */
		facebookAppId: '893383560683390',

		/**
		 *	Function to initialise the Facebook Javascript SDK
		 *	
		 *	@method initFacebookSDK
		 *	@return undefined
		 */
		initFacebookSDK: function() {

			window.fbAsyncInit = function() {
			    FB.init({
					appId      : this.facebookAppId,
					xfbml      : true,
					version    : 'v2.2',
					status	   : true
			    });
			}.bind(this);

			(function(d, s, id){
				var js, fjs = d.getElementsByTagName(s)[0];
				if (d.getElementById(id)) {return;}
				js = d.createElement(s); js.id = id;
				js.src = "//connect.facebook.net/en_US/sdk.js";
				fjs.parentNode.insertBefore(js, fjs);
			}(document, 'script', 'facebook-jssdk'));
		}
	}

};

