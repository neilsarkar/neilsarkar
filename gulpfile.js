var gulp = require('gulp'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    server = require('gulp-express'),
    browserSync = require('browser-sync'),
    fs = require('fs'),
    paths = JSON.parse(fs.readFileSync('./manifest.json', 'utf8'));

gulp.task('js', function() {
  return gulp.src(paths.js).
    pipe(concat('application.js')).
    pipe(gulp.dest('app/dist/'));
});

gulp.task('css', function() {
  return gulp.src(paths.css).
    pipe(sass()).on('error', function(err) { console.error(err.message); this.emit('end'); }).
    pipe(concat('application.css')).
    pipe(gulp.dest('app/dist/')).
    pipe(browserSync.reload({stream: true}));
})

gulp.task('img', function() {
  return gulp.src(paths.img).
    pipe(gulp.dest('app/dist/images/'))
})

gulp.task('watch', function() {
  gulp.watch(paths.js, ['js', browserSync.reload])
  gulp.watch(paths.css, ['css'])
  // TODO: don't compile js. if we remove this, browsersync behaves strangely.
  gulp.watch(paths.html, ['js', browserSync.reload])
  gulp.watch(paths.img, ['js', browserSync.reload])
})

gulp.task('server', function() {
  server.run({
    file: 'index.js'
  })

  browserSync({
    proxy: 'localhost:3000',
    port: 5000
  })

  gulp.watch(['index.js'], [server.run])
})

gulp.task('build', ['js', 'css', 'img'])
gulp.task('default', ['build', 'server', 'watch'])
