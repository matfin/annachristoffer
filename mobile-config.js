App.info({
	id: 'com.annachristoffer.web',
	name: 'Anna Claire Christoffer',
	description: 'Meteor App for the portfolio website of Anna Christoffer',
	author: 'Anna Christoffer',
	email: 'mail@annachristoffer.com',
	website: 'http://annachristoffer.com'
});

App.icons({
	'iphone': 'public/favicons/apple-touch-icon-60x60.png',
	'iphone_2x': 'public/favicons/apple-touch-icon-120x120.png',
	'iphone_3x': 'public/favicons/apple-touch-icon-180x180.png'
});

App.accessRule('*');

App.setPreference('BackgroundColor', '0xffffffff');