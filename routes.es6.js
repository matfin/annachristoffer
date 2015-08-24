'use strict';

/**
 *	Common for all routes
 */
Router.configure({
	layoutTemplate: 'template_main',
	loadingTemplate: 'components_loading'
});

Router.onBeforeAction(function() {
	let header = $('header');
	if(header.hasClass('header--revealed')) {
		header.removeClass('header--revealed');
	}
	this.next();
});

/**
 *	Main route for landing page with an optional 
 *	category slug.
 */
Router.route('/:_slug?', function() {
	this.render('views_list', {
		to: 'content',
		data: {
			slug: this.params._slug 
		}
	});
	this.render('partials_header', {
		to: 'header'
	});
}, {name: 'category.show'});

/**
 *	Project detail view route
 */
Router.route('/project/:_slug', function() {
	this.render('views_detail', {
		to: 'content',
		data: {
			slug: this.params._slug 
		}
	});
	this.render('partials_header', {
		to: 'header'
	});
}, {name: 'project.show'});

/**
 *	Generic content detail view
 */
Router.route('/content/:_slug', function() {
	this.render('views_content', {
		to: 'content',
		data: {
			slug: this.params._slug 
		}
	});
	this.render('partials_header', {
		to: 'header'
	});
}, {name: 'content.show'});


