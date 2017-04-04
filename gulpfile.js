'use strict';

const 	gulp 	= require('gulp'),
		sass 	= require('gulp-sass'),
		concat	= require('gulp-concat');

gulp.task('sassdev', () => {
	return gulp
	.src('./annachristoffer/static/sass/main.sass')
	.pipe(sass())
	.on('error', sass.logError)
	.pipe(gulp.dest('./annachristoffer/static/css'))
});

gulp.task('scriptsdev', () => {
	return gulp
	.src([
		'./bower_components/matfin-slider/_src/slider.js',
		'./annachristoffer/static/js/*.js'
	])
	.pipe(concat('all.js'))
	.pipe(gulp.dest('./annachristoffer/static/js/dist'));

});

gulp.task('watch', () => {
	gulp.watch('./annachristoffer/static/sass/**/*.sass', ['sassdev']);
	gulp.watch([
		'./annachristoffer/static/js/main.js'
	], ['scriptsdev']);
});