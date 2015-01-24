var gulp = require('gulp'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
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
    pipe(gulp.dest('dist/'));
});

gulp.task('css', function() {
  return gulp.src(paths.css).
    pipe(sass()).on('error', function(err) { console.error("SCSS compile error:" + err.message); this.emit('end'); }).
    pipe(concat('application.css')).
    pipe(gulp.dest('dist/')).
    pipe(browserSync.reload({stream: true}));
})

gulp.task('img', function() {
  return gulp.src(paths.img, {base: 'app/img/'}).
    pipe(gulp.dest('dist/images/'));
})

gulp.task('html', function() {
  return gulp.src(paths.html, {base: 'app/'}).
    pipe(gulp.dest('dist'));
})

gulp.task('build', ['js', 'img', 'css', 'html'])

if( !process.env.NODE_ENV || process.env.NODE_ENV == 'development' ) {
  var server = require('gulp-express'),
      browserSync = require('browser-sync');

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

    process.stdin.on('data', function(line) {
      if( line.toString() === "\n" ) {
        gulp.run('build')
      }
    })

    // (Re)sets watchers
    function setWatchers() {
      gulp.watch(paths.js, ['js', browserSync.reload])
      gulp.watch(paths.css, ['css']) // browserSync automatically reloads
      gulp.watch(paths.html, ['html', browserSync.reload])
      gulp.watch(paths.img, ['img', browserSync.reload])
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
  gulp.task('default', ['build', 'server', 'watch'])
}
