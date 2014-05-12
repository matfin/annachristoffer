App = {
	baseUrl: 'http://localhost:3000',

	language: moment.lang(),

	models: {
		content: new Meteor.Collection('content', {connection: null}),
		projects: new Meteor.Collection('projects', {connection: null}),
		categories: new Meteor.Collection('categories', {connection: null})
	}
};