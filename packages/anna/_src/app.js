App = {
	baseUrl: 'http://localhost:3000',

	models: {
		content: new Meteor.Collection('content', {connection: null}),
		projects: new Meteor.Collection('projects', {connection: null}),
		categories: new Meteor.Collection('categories', {connection: null})
	}
};