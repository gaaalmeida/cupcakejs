/*
 * Cupcakejs v1.0.0 Marshmallow
*/
var gulp        = require('gulp');
var prefix      = require('gulp-autoprefixer');
var clean       = require('gulp-clean-css');
var concat      = require('gulp-concat');
var uglify      = require('gulp-uglify');
var browserSync = require('browser-sync');
var plumber     = require('gulp-plumber');
var less        = require('gulp-less');
var zip         = require('gulp-zip');
var minimg      = require('gulp-imagemin');
var pug         = require('gulp-pug');


/*
 * Starting Server
 */
gulp.task('serve', ['watch'], function(){
  return browserSync.init({
    injectChanges: true,
    server: {
      baseDir: './app/dist/'
    }
  })

  gulp.watch('app/dist/css/*.css')
  gulp.watch('app/dist/js/*.js')
  gulp.watch('app/dist/**/*.html').on('change', browserSync.reload());
});

/*
 * Compile Jade
 */
gulp.task('pug', function(){
  return gulp.src('app/pugfiles/**/*.pug')
    .pipe(pug())
    .pipe(gulp.dest('app/dist/'))
    .pipe(browserSync.reload({stream:true}));
});

/*
 * Minify Images
 */
gulp.task('imgmin', function(){
  return gulp.src('app/assets/media/*')
    .pipe(minimg())
    .pipe(gulp.dest('app/dist/media'));
});

/*
 * Compile LESS
 */
gulp.task('less', function(){
  return gulp.src('app/assets/**/*.less')
    .pipe(plumber(function (error) {
      console.log(error);
      this.emit('end');
      }))
    .pipe(less())
    .pipe(prefix())
    .pipe(clean())
    .pipe(gulp.dest('app/dist/css'))
    .pipe(browserSync.reload({stream:true}));
});

/*
 * Concat and Uglify JS
 */
gulp.task('js', function(){
  return gulp.src('app/assets/js/**/*.js')
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest('app/dist/js'))
    .pipe(browserSync.reload({stream:true}));
});

/*
 * Watch
 */
gulp.task('watch', function(){
  gulp.watch('app/assets/**/*.less', ['less'])
  gulp.watch(['app/assts/media/**/*.png', 'app/assts/media/**/*.jpg', 'app/assts/media/**/*.jpeg', 'app/assts/media/**/*.gif', 'app/assts/media/**/*.svg'], ['imgmin'])
  gulp.watch('app/assets/media/**/*.js', ['js'])
  gulp.watch('app/pugfiles/**/*.pug', ['pug']);
});

/*
 * ZIP
 */
gulp.task('zip', function(){
  return gulp.src('app/dist/*')
    .pipe(zip('dist.zip'))
    .pipe(gulp.dest('./zipfiles'));
});

/*
 * Default Task
 */
gulp.task('default', ['serve']);