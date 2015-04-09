/**
 *	Used with a custom callback to push messages to the containing webview
 *	for when this app is embedded inside a native app.
 *
 *	@class Bridge
 *	@static
 */
Bridge = {

	/**
 	 *	Callback protocol string 
 	 *	
 	 *	@property	callbackScheme
 	 *	@type 		{String}
 	 */
 	callbackScheme: 'accallback://',

 	/**
 	 *	Function to pass data back to the webview
 	 *	
 	 *	@function 	notifyWebview
 	 *	@param		{String} - the message to post
 	 *	@return 	undefined
 	 */
 	notifyWebview: function(message) {
 		window.location.href = this.callbackScheme + 'ac/?' + message;
 	}

};
