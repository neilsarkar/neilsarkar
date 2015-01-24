var gulp = require('gulp'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    server = require('gulp-express'),
    browserSync = require('browser-sync'),
    fs = require('fs'),
    paths;

// read paths on load
readPaths()
function readPaths() {
  return paths = JSON.parse(fs.readFileSync('./manifest.json', 'utf8'))
}

gulp.task('js', function() {
  return gulp.src(paths.js).
    pipe(concat('application.js')).
    pipe(gulp.dest('app/dist/'));
});

gulp.task('css', function() {
  return gulp.src(paths.css).
    pipe(sass()).on('error', function(err) { console.error("SCSS compile error:" + err.message); this.emit('end'); }).
    pipe(concat('application.css')).
    pipe(gulp.dest('app/dist/')).
    pipe(browserSync.reload({stream: true}));
})

gulp.task('img', function() {
  return gulp.src(paths.img).
    pipe(gulp.dest('app/dist/images/'))
})

// Watches asset paths and reloads browser on changes
gulp.task('watch', function() {
  setWatchers()

  // Restart process when gulpfile is changed
  gulp.watch('gulpfile.js', function() {
    console.log("Gulpfile changed, you should restart")
    process.exit(0)
  })

  // Reset paths and watchers when manifest.json is changed
  gulp.watch('manifest.json', function() {
    readPaths()
    setWatchers()
  })

  // (Re)sets watchers
  function setWatchers() {
    gulp.watch(paths.js, ['js', browserSync.reload])
    gulp.watch(paths.css, ['css'])
    gulp.watch(paths.html, ['js', browserSync.reload])
    gulp.watch(paths.img, ['js', browserSync.reload])
  }
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
