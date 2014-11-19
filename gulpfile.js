var gulp = require('gulp'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    server = require('gulp-express'),
    fs = require('fs'),
    paths = JSON.parse(fs.readFileSync('./manifest.json', 'utf8'));

gulp.task('scripts', function() {
  return gulp.src(paths.js).
    pipe(concat('application.js')).
    pipe(gulp.dest('app/dist/'));
});

gulp.task('stylesheets', function() {
  return gulp.src(paths.css).
    pipe(sass()).
    pipe(concat('application.css')).
    pipe(gulp.dest('app/dist/'));
})

gulp.task('watch', function() {
  gulp.watch(paths.js, ['scripts'])
  gulp.watch(paths.css, ['stylesheets'])
})

gulp.task('server', function() {
  server.run({
    file: 'app.js'
  })

  gulp.watch(['app.js'], [server.run]);
})

gulp.task('build', ['scripts', 'stylesheets'])
gulp.task('default', ['scripts', 'stylesheets', 'server','watch'])
