'use strict';

Wistia = {

	/**
	 *	Requirements
	 */
	request: Npm.require('request'),

	/**
	 *	Object properties
	 */
	settings: Meteor.settings.wistia,
	collection: new Mongo.Collection('videos'),

	/**
	 *	Function to fetch data from the Wistia endpoint
	 *
	 *	@method fetch
	 *	@param 	{Function} resolve - to be called when the data is fetched
	 *	@param	{Function} reject - to be called when there was an error
	 *	@return {Object} a promise
	 */
	fetch (resolve, reject) {

		if(!resolve || !reject) return;

		let source 			= this.settings.host,
				projectId		= this.settings.projectId,
				accessToken = this.settings.accessToken,
				url 				= `${source}/medias.json?api_password=${accessToken}&projectId=${projectId}`,
				items;

		this.request({url: url}, (error, response, body) => {
			if(!error && response.statusCode === 200) {
				items = JSON.parse(body);
				resolve(items);
			}
			else {
				reject(error);
			}
		});
	},

	/**
	 *	Function to refresh the video collection with new data
	 *
	 *	@method refresh
	 */
	refresh () {
		let promise = new Promise(this.fetch.bind(this));
		promise.then(Meteor.bindEnvironment((result) => {
			result.map((item) => {
				this.collection.update({'hashed_id': item.hashed_id}, item, {upsert: true});
			});
		})).catch((error) => {
			console.log(`Error updating videos: ${error}`);
		});
	}
};