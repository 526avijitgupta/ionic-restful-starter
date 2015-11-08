var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var clean = require('gulp-clean');
var uglify = require('gulp-uglify');
var less = require('gulp-less');
var changed = require('gulp-changed');
var watch = require('gulp-watch');
var plumber = require('gulp-plumber');
var ngAnnotate = require('gulp-ng-annotate');
var minifyHtml = require('gulp-minify-html');
var size = require('gulp-size');
var autoprefixer = require('gulp-autoprefixer');
var jshint = require('gulp-jshint');

// File Paths
var paths = {
  build: {
    main: 'www/dist/',
    js: 'www/dist/js/',
    css: 'www/dist/css/',
    html: 'www/dist/html/'
  },
  js: 'www/js/**/*.js',
  css: 'www/less/**/*.less',
  html: 'www/views/**/*.html'
};

gulp.task('default', ['clean'], function () {
  gulp.start('js', 'css', 'html', 'watch');
});

gulp.task('clean', function () {
  return gulp.src([paths.build.main], {read: false})
    .pipe(clean({force: true}));
});

gulp.task('js', function() {
  return gulp.src(paths.js)
    .pipe(plumber())
    .pipe(changed(paths.js))
    .pipe(ngAnnotate())
    .pipe(jshint())
    .pipe(jshint.reporter("jshint-stylish"))
    .pipe(concat('bundle.js'))
    .pipe(size({
      title: 'JS before minify'
    }))
    .pipe(gulp.dest(paths.build.js))
    .pipe(uglify())
    .pipe(rename('bundle.min.js'))
    .pipe(gulp.dest(paths.build.js))
    .pipe(size({
      title: 'JS after minify'
    }))
});

gulp.task('css', function () {
  return gulp.src(paths.css)
    .pipe(plumber())
    .pipe(changed(paths.css))
    .pipe(less())
    .pipe(autoprefixer('last 2 versions'))
    .pipe(concat('style.css'))
    .pipe(size({
      title: 'CSS before minify'
    }))
    .pipe(gulp.dest(paths.build.css))
    .pipe(minifyCss())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest(paths.build.css))
    .pipe(size({
      title: 'CSS after minify'
    }))
});

gulp.task('html', function() {
  return gulp.src(paths.html)
    .pipe(plumber())
    .pipe(changed(paths.html))
    .pipe(size({
      title: 'HTML before minify'
    }))
    .pipe(minifyHtml({empty: true}))
    .pipe(gulp.dest(paths.build.html))
    .pipe(size({
      title: 'HTML after minify'
    }))
});

gulp.task('watch', function() {
  gulp.watch(paths.js, ['js']);
  gulp.watch(paths.html, ['html']);
  gulp.watch(paths.css, ['css']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});
