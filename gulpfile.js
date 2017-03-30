'use strict';

let gulp = require('gulp'),
	sass = require('gulp-sass');

gulp.task('sassdev', () => 
	gulp
	.src('./annachristoffer/static/sass/main.sass')
	.pipe(sass())
	.on('error', sass.logError)
	.pipe(gulp.dest('./annachristoffer/static/css'))
);

gulp.task('watch', () => {
	gulp.watch('./annachristoffer/static/sass/*.sass', ['sassdev']);
});