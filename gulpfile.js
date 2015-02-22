var gulp        = require('gulp');
var browserify  = require('gulp-browserify');
var react       = require('gulp-react');
var plumber     = require('gulp-plumber');
var concat      = require('gulp-concat');

gulp.task('default', ['build-client', 'build-server']);
gulp.task('build-client', ['compile-jsx', 'copy-index']);
gulp.task('build-server', ['build-api']);

gulp.task('compile-jsx', function(cb){
  return gulp.src([
    './src/client/public/coinbox.jsx'
  ])
  .pipe(plumber())
  .pipe(react({ addPragma: false }))
  .pipe(browserify({
    insertGlobals: true,
    debug: false
  }))
  .pipe(concat('coinbox.js'))
  .pipe(gulp.dest('./release/public/'));
});

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
