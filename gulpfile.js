/* File: gulpfile.js */

// grab our packages
var gulp      = require('gulp'),
  gutil       = require('gulp-util'),
  jshint      = require('gulp-jshint'),
  concat      = require('gulp-concat'),
  sourcemaps  = require('gulp-sourcemaps'),
  jsonServer  = require('gulp-json-srv'),
  minify      = require('gulp-minify-css'),
  rename      = require('gulp-rename'),
  server      = jsonServer.start({  // config the json-server instance
          data: 'db.json',
          id: 'unid',
          rewriteRules: {
            "/xsp/houses": "/houses",
            "/xsp/:houses/:id": "/:houses/:id",
            "/xsp/characters": "/characters",
            "/xsp/:characters/:id": "/:characters/:id"
          },
          deferredStart: true
        });

// configure the jshint task
gulp.task('jshint', function() {
  return gulp.src('NSF/WebContent/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

// build dist JS assets
gulp.task('build-js', function() {
  return gulp.src('NSF/WebContent/js/*.js')
    .pipe(sourcemaps.init())
    .pipe(concat('scripts_from_gulp.js'))
    //only uglify if gulp is ran with '--type production'
    .pipe(gutil.env.type === 'production' ? uglify() : gutil.noop()) 
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('public/dist'));
});

gulp.task('cssmin', function(){
  gulp.src('NSF/WebContent/css/*.css')
    .pipe(minify({ keepBreaks: false }))
    /*
    // builds individually minified files
    .pipe(rename({
      suffix: '.min'
    }))
    */
    .pipe(concat('style.min.css')) // combines into single minified CSS file
    .pipe(gulp.dest('public/dist'));
});

// configure which files to watch and what tasks to use on file changes
gulp.task('watch', function() {
  gulp.watch('NSF/WebContent/js/*.js', ['jshint']);
  gulp.watch(['db.json'], function(){
    server.reload();
  });
  gulp.watch('NSF/WebContent/css/*.css', ['cssmin']);
  gulp.watch('NSF/WebContent/partials/*.html')
});

// starts the json-server instance
gulp.task('serverStart', function(){
  server.start();
});

// define the default task and add the watch task to it
gulp.task('default', ['watch','serverStart']);