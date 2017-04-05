'use strict';

const 	gulp 		= require('gulp'),
		sass 		= require('gulp-sass'),
		concat		= require('gulp-concat'),
		cleancss	= require('gulp-clean-css');

gulp.task('copy-fa-fonts', () => {
	return gulp
	.src(['./node_modules/font-awesome/fonts/**/*'])
	.pipe(gulp.dest('./annachristoffer/static/fonts'));
});

gulp.task('copy-fa-scss', () => {
	return gulp
	.src(['./node_modules/font-awesome/scss/**/*'])
	.pipe(gulp.dest('./annachristoffer/static/sass/thirdparty/font-awesome'));
});

gulp.task('sass-dev', () => {
	return gulp
	.src('./annachristoffer/static/sass/main.sass')
	.pipe(sass())
	.on('error', sass.logError)
	.pipe(gulp.dest('./annachristoffer/static/css'))
});

gulp.task('scripts-dev', () => {
	return gulp
	.src([
		'./bower_components/matfin-slider/_src/slider.js',
		'./annachristoffer/static/js/*.js'
	])
	.pipe(concat('all.js'))
	.pipe(gulp.dest('./annachristoffer/static/js/dist'));

});

gulp.task('watch', () => {
	gulp.watch('./annachristoffer/static/sass/**/*.sass', ['sass-dev']);
	gulp.watch([
		'./annachristoffer/static/js/main.js'
	], ['scripts-dev']);
});

gulp.task('default', [
	'copy-fa-fonts',
	'copy-fa-scss',
	'sass-dev',
	'scripts-dev',
	'watch'
]);

gulp.task('sass-build', () => {
	return gulp
	.src('./annachristoffer/static/sass/main.sass')
	.pipe(sass())
	.on('error', sass.logError)
	.pipe(cleancss())
	.pipe(gulp.dest('./annachristoffer/static/css'))
});

gulp.task('scripts-build', () => {

});

gulp.task('build', [
	'copy-fa-fonts',
	'copy-fa-scss'
]);