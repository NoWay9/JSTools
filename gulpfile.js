var jshint = require('gulp-jshint');
var gulp = require('gulp');
var sass = require('gulp-sass');
var copy = require('gulp-contrib-copy');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var pump = require('pump');
var del = require('del');
var connect = require('gulp-connect');
var clean = require('gulp-clean');

/*JShint*/
gulp.task('lint', function () {
  return gulp.src('./src/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

/*Sass*/
gulp.task('sass', function () {
  return gulp.src('./src/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./src'))
    .pipe(connect.reload());
});

/*Copy*/
gulp.task('copy', function () {
  gulp.src('src/**/*')
    .pipe(copy())
    .pipe(gulp.dest('dest/'));
});

/*Concat*/
gulp.task('scripts', function () {
  return gulp.src(['./src/common.js', './src/some.js'])
    .pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./prod/js'));
});

/*Uglify*/
gulp.task('compress', function (cb) {
  pump([
    gulp.src('./src/*.js'),
    uglify(),
    gulp.dest('./dist')
  ],
    cb
  );
});

/*Del*/
gulp.task('del', function () {
  return del(['./src/*.js']).then(paths => {
    console.log('Deleted files and folders:\n', paths.join('\n'));
  });
})

/*Livereload*/
gulp.task('connect', function () {
  connect.server({
    root: 'src',
    livereload: true
  });
});

/*Watch*/
gulp.task('watch', function () {
  gulp.watch('./src/**/*.scss', ['sass']);
});

/*Task for prod*/
gulp.task('cop', function () {
  gulp.src('./src/*.html')
    .pipe(copy())
    .pipe(gulp.dest('./prod/'));
});

gulp.task('copycss', function () {
  gulp.src('./src/*.css')
    .pipe(copy())
    .pipe(gulp.dest('./prod/css'));
});


gulp.task('clean', function () {
  return gulp.src('./prod', { read: false })
    .pipe(clean());
});

gulp.task('prod', ['clean', 'cop', 'copycss', 'scripts']);

gulp.task('default', ['connect', 'watch']);
