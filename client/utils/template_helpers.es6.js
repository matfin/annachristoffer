'use strict';

/**
 *	Helper function to format time using moment.js
 *	
 *	@method 	formattedDate
 *	@param 		{String} date 	- an unformatted date
 *	@param		{String} format -	desired date format for moment.js 
 *	@return		{String} - reformatted date
 */
UI.registerHelper('formattedDate', (date, format) => {
	let m = moment(date);
	return m.isValid() ? m.format(format):date;
});

/**
 *	Helper function to get the base url for images
 *
 *	@method		mediaUrl
 *	@return 	{String} - the base url for images from Meteor.settings
 */
UI.registerHelper('mediaUrl', () => {
	return Meteor.settings.public.mediaUrl;
});

/**
 *	Helper function to access the device parameters inside templates
 *
 *	@method device
 *	@return {Object} - the device class with calculated device parameters
 */
UI.registerHelper('device', () => {
	Dependencies.resized.depend();
	return Device;
});

/**
 *	Function to turn a string of text into a lower case classname friendly string
 *
 *	@method 	asClassName
 *	@param 		{String} sourceString - the source string
 *	@return 	{String} - the classname friendly string
 */
UI.registerHelper('asClassName', (sourceString) => {
	return sourceString.replace(/\s/g, '-').toLowerCase();
});