var gulp = require("gulp");
var eslint = require('gulp-eslint');
var rename = require('gulp-rename');
var util = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var watchify = require("watchify");
var browserify = require("browserify");
var babelify = require("babelify");
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

var config = {
	src: './js/src',
        dest: './js/build'
};

var files = {
        entry: config.src + '/app.jsx',
	code: [
		config.src + '/**/*.js',
		config.src + '/**/*.jsx',
	]
};

gulp.task('eslint', function () {
        return gulp.src(files.code)
                .pipe(eslint())
                .pipe(eslint.format());
});

gulp.task('build', [ 'eslint' ], function() {
	var bundler = browserify({
                extensions: ['.js', '.jsx'],
                transform: ['babelify'],
                debug: true
        });

        return bundler
                .add(files.entry)
                .bundle()
                .pipe(source(files.entry))
		.pipe(buffer())
		.pipe(sourcemaps.init({ loadMaps: true }))
                .pipe(rename('app.js'))
		.pipe(sourcemaps.write('./'))
                .pipe(gulp.dest(config.dest));
 });

gulp.task('watch', function() {
	 gulp.watch(files.code, [ 'build' ]);
});

gulp.task('default', [ 'build' ]);