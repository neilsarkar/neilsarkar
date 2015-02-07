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

gulp.task('build', ['js', 'img', 'css', 'html'])

gulp.task('js', function() {
  // for all paths in js manifest
  return gulp.src(paths.js).
    // concatenate together into an application.js file
    pipe(concat('application.js')).
    // and write to ./dist
    pipe(gulp.dest('dist/'));
});

gulp.task('css', function() {
  // for all paths in css manifest
  return gulp.src(paths.css).
    // run through sass, ignoring errors
    pipe(sass()).on('error', function(err) { console.error("SCSS compile error:" + err.message); this.emit('end'); }).
    // concatenate into an application.css file
    pipe(concat('application.css')).
    // write to ./dist
    pipe(gulp.dest('dist/')).
    // and reload browsersync
    pipe(browserSync.reload({stream: true}));
})

gulp.task('img', function() {
  // for all paths in img manifest
  return gulp.src(paths.img, {base: 'app/img/'}).
    // copy to ./dist/images
    pipe(gulp.dest('dist/images/'));
})

gulp.task('html', function() {
  // for all paths in html manifest
  return gulp.src(paths.html, {base: 'app/'}).
    // copy to ./dist
    pipe(gulp.dest('dist'));
})

// in development mode, register watch task for automatic server reloading
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

    // Build manually on enter key in terminal
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
