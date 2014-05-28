/**
 * Collection of generic helper functions the app will need.
 *
 * @class Helpers
 * @static
 */
Helpers = {

	/**
	 *	Method to load localised content which is called when the app is first run.
	 *	and when the user opts to switch langage. It is important to node that
	 *	the app language parameter (EN|DE) is set within the App object and does not
	 *	need to be passed in here as a parameter. 
	 *	
	 *	@method reset
	 *	@return undefined
	 */
	loadLocalisedContent: function() {
		/**
		 *	Each of these corresponds to the json files we have stored 
		 *	for each language.
		 */
		var contents = [
			'pages',
			'projects',
			'categories',
			'formations'
		];

		/**
		 *	Loop through these and load the content for each, 
		 *	making sure to clear out old content. This is useful
		 *	for easily switching language within the app.
		 */

		_.each(contents, function(contentItem) {

			/**
			 *	Clear out old content that may already exist
			 */
		    App.models[contentItem].remove({});

		    /**
		     *	Then populate from the local json files.
		     */

			Api.fetch(contentItem).then(function(data) {
				_.each(data.items, function(item){
					App.models[contentItem].insert(item);
				});
			}).fail(function(error) {
				console.log(error);
			});
		});
	},

	/**
	 *	Given various device parameters, such as screen pixel density and resolutuin,
	 *	this helper function will determine the correct image to load given a path.
	 *	
	 *	@method reset
	 *	@param {String}		the string for the image path
	 *	@return {String}	the image path with file extension
	 */
	loadImageSource: function(img, extension) {
		/**
		 *	If the extension is not specified, use jpg as default
		 */
		if(typeof extension === 'undefined') {
			extension = 'jpg';
		}
		var imgSource = '';

		if(img && typeof img !== 'undefined') {

			if(Device.isHD) {
				imgSource = img + '-hd';
			}
			else if(Device.isDesktop) {
				imgSource = img + '-d';
			}
			else {
				imgSource = img;
			}

			if(Device.isRetina) {
				return imgSource + '@2x.' + extension;
			}
			else {
				return imgSource + '.' + extension;
			}
		}
	}
};