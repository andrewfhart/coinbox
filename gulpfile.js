var gulp        = require('gulp');
var debug       = require('gulp-debug');
var source      = require('vinyl-source-stream');
var browserify  = require('browserify');
var watchify    = require('watchify');
var reactify    = require('reactify');
var concat      = require('gulp-concat');
var plumber     = require('gulp-plumber');

gulp.task('default', ['build-client', 'build-server']);
gulp.task('build-client', ['compile-jsx', 'copy-index']);
gulp.task('build-server', ['build-api']);

gulp.task('compile-jsx', function(cb){

  var bundler = browserify({
    entries: ['./src/client/public/coinbox.jsx'],
    transform: ['reactify'],
    debug: true,
    cache: {}, packageCache: {}, fullPaths: true
  });

  var watcher = watchify(bundler);

  return watcher
    .on('update', function (){  // When any files update...
      var updateStart = Date.now();
      console.log('Updating!');
      watcher.bundle()
        .pipe(source('coinbox.js'))
        .pipe(gulp.dest('./release/public/'));
      console.log('Updated.', Date.now() - updateStart  + 'ms');
    })
    .bundle()   // create the initial bundle when starting the task
    .pipe(source('coinbox.js'))
    .pipe(gulp.dest('./release/public/'));
});

/*
  return gulp.src([
    './src/client/public/components/**//*.jsx',
    './src/client/public/coinbox.jsx',
    './src/client/public/routes.jsx'
  ])
  .pipe(debug())
  .pipe(plumber())
  .pipe(react({ addPragma: false }))
  .pipe(browserify({
    insertGlobals: true,
    debug: false
  }))
  .pipe(concat('coinbox.js'))
  .pipe(gulp.dest('./release/public/'));
});
*/

gulp.task('copy-index', function (cb) {
  return gulp.src([
    './src/client/public/index.html'
  ])
  .pipe(gulp.dest('./release/public/'));
});

gulp.task('build-api', function (cb) {
  return gulp.src([
    'src/server/api/**/*',
    'src/server/app.js',
    'src/server/config/**/*',
    'src/server/models/**/*'
  ], { 'base' : './src/server' })
  .pipe(gulp.dest('./release/'));
});
