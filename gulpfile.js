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
	.pipe(gulp.dest('./assets/sass/thirdparty/font-awesome'));
});

gulp.task('sass-dev', ['copy-fa-fonts', 'copy-fa-scss'], () => {
	return gulp
	.src('./assets/sass/main.sass')
	.pipe(sass())
	.on('error', sass.logError)
	.pipe(gulp.dest('./annachristoffer/static/css'))
});

gulp.task('sass-build', ['copy-fa-fonts', 'copy-fa-scss'], () => {
	return gulp
	.src('./assets/sass/main.sass')
	.pipe(sass())
	.on('error', sass.logError)
	.pipe(cleancss())
	.pipe(gulp.dest('./annachristoffer/static/css'))
});

gulp.task('scripts', () => {
	return gulp
	.src([
		'./bower_components/matfin-slider/_src/slider.js',
		'./assets/scripts/**/*'
	])
	.pipe(concat('main.js'))
	.pipe(gulp.dest('./annachristoffer/static/js'));

});

gulp.task('watch', () => {
	gulp.watch('./assets/sass/**/*.sass', ['sass-dev']);
	gulp.watch('./assets/scripts/**/*.js', ['scripts']);
});

gulp.task('default', [
	'sass-dev',
	'scripts',
	'watch'
]);

gulp.task('build', [
	'sass-build',
	'scripts'
]);