var gulp = require("gulp");
var rename = require('gulp-rename');
var util = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var watchify = require("watchify");
var browserify = require("browserify");
var tsify = require("tsify");
var babelify = require("babelify");
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

var config = {
	src: './js/src',
        dest: './js/build'
};

var files = {
        entry: config.src + '/app.tsx',
	code: [ ]
};

function bundle(watch) {
	/* bundler: use browserify */
	var bundler = browserify({
		debug: true,
		extensions: ['.ts', '.tsx'],
		cache: {},
		packageCache: {}
	});
	bundler.plugin(tsify);
	bundler.transform(babelify);

	function compile(_bundler) {
		return _bundler
			.add(files.entry)
			.add(files.code)
			.bundle()
			.pipe(source(files.entry))
			.pipe(buffer())
			.pipe(sourcemaps.init({ loadMaps: true }))
			.pipe(rename('app.js'))
			//.pipe(uglify())
			.pipe(sourcemaps.write('./'))
			.pipe(gulp.dest(config.dest));
	}

	if (watch) {
		/* watcher: use watchify */
		var watcher = watchify(bundler);

		watcher.on('update', function() {
			util.log('... rebuild ...');
			return compile(watcher);
		});
		watcher.on('error', util.log);
		watcher.on('log', util.log);
	}

	return compile(bundler);
}

gulp.task('default', [ 'build' ]);

function build() {
	util.log('... build ...');
	return bundle(false);
}
gulp.task('build', function() { return build(); });

function watch() {
	util.log('... watch ...');
	return bundle(true);
}
gulp.task('watch', function() { return watch(); });
