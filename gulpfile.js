'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var server = require('browser-sync').create();
var plumber = require('gulp-plumber');
var htmlhint = require('gulp-htmlhint');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var imagemin = require('gulp-imagemin');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var csso = require('gulp-csso');
var del = require('del');
var rename = require('gulp-rename');

gulp.task('css', function() {
  return gulp.src('app/sass/style.scss')
    .pipe(plumber())
    .pipe(sass({
      includePaths: require('node-normalize-scss').includePaths
    }))
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("dist/css"))
    .pipe(csso())
    .pipe(rename("style-min.css"))
    .pipe(gulp.dest("dist/css"))
    .pipe(server.stream());
});

gulp.task('html', function() {
  return gulp.src('app/*.html')
    .pipe(htmlhint())
    .pipe(htmlhint.failAfterError())
    .pipe(gulp.dest('dist/'))
    .pipe(server.stream());
});

gulp.task('js', function () {
  return gulp.src('app/js/*.js')
    .pipe(uglify())
    .pipe(concat('all.js'))
    .pipe(gulp.dest('dist/js'))
    .pipe(server.stream());
});

gulp.task('img', function() {
  return gulp.src('app/img/*')
    .pipe(gulp.dest('dist/img'));
});

gulp.task('font', function() {
  return gulp.src('app/fonts/*')
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('server', function () {
  server.init({
    server: 'dist/',
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch('app/sass/**/*.{scss,sass}').on('change', gulp.series('css'));
  gulp.watch('app/**/*.html').on('change', gulp.series('html'));
  gulp.watch('app/js/*.js').on('change', gulp.series('js'));
});

gulp.task('clean', function () {
  return del('dist');
});

gulp.task('start', gulp.series('css', 'html', 'server'));
gulp.task('build', gulp.series('clean', 'css', 'html', 'js', 'img', 'font', 'server'));
