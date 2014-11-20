var gulp = require('gulp'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    server = require('gulp-express'),
    browserSync = require('browser-sync'),
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
    pipe(gulp.dest('app/dist/')).
    pipe(browserSync.reload({stream: true}));
})

gulp.task('watch', function() {
  gulp.watch(paths.js, ['scripts', browserSync.reload])
  gulp.watch(paths.css, ['stylesheets'])
  // TODO: don't compile scripts. if we remove this, browsersync behaves strangely.
  gulp.watch(paths.html, ['scripts', browserSync.reload])
})

gulp.task('server', function() {
  server.run({
    file: 'app.js'
  })

  browserSync({
    proxy: 'localhost:3000',
    port: 5000
  })

  gulp.watch(['app.js'], [server.run])
})

gulp.task('build', ['scripts', 'stylesheets'])
gulp.task('default', ['scripts', 'stylesheets', 'server', 'watch'])
