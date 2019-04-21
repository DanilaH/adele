'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var server = require('browser-sync').create();
var plumber = require('gulp-plumber');
var htmlhint = require('gulp-htmlhint');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var font =  require('postcss-font-magician');
var imagemin = require('gulp-imagemin');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var csso = require('gulp-csso');
var del = require('del');

gulp.task('css', function() {
  return gulp.src('app/sass/style.scss')
    .pipe(plumber())
    .pipe(sass({
      includePaths: require('node-normalize-scss').includePaths
    }))
    .pipe(postcss([
      font(
      {
         display: 'swap'
       }
      ),
      autoprefixer()
    ]))
    .pipe(csso())
    .pipe(gulp.dest('dist/css'))
    .pipe(server.stream());
});

gulp.task('html', function() {
  return gulp.src('app/*.html')
    .pipe(htmlhint())
    .pipe(htmlhint.failAfterError())
    .pipe(server.stream())
    .pipe(gulp.dest('dist/'));
});

gulp.task('js', function () {
  return gulp.src('app/js/*.js')
    .pipe(uglify())
    .pipe(concat('all.js'))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('img', function() {
  return gulp.src('app/img/*')
    .pipe(imagemin([
      imagemin.jpegtran({progressive: true}),
      imagemin.optipng({optimizationLevel: 3})
    ]))
    .pipe(gulp.dest('dist/img'));
});
gulp
gulp.task('server', function () {
  server.init({
    server: 'app/',
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch('app/sass/**/*.{scss,sass}').on('change', gulp.series('css'));
  gulp.watch('app/**/*.html').on('change', gulp.series('html'));
});

gulp.task('clean', function () {
  return del('dist');
});

gulp.task('start', gulp.series('css', 'html', 'server'));
gulp.task('build', gulp.series('clean', 'css', 'html', 'js', 'img'));
