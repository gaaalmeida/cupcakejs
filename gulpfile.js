/*
 * Cupcakejs v2.0.0 Nanaimo
*/
var gulp        = require('gulp');
var prefix      = require('gulp-autoprefixer');
var clean       = require('gulp-clean-css');
var concat      = require('gulp-concat');
var uglify      = require('gulp-uglify');
var browserSync = require('browser-sync');
var sass        = require('gulp-sass');
var pug         = require('gulp-pug');


/*
 * Starting Server
 */
gulp.task('server', ['watch'], function(){
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
 * Compile Pug
 */
gulp.task('pug', function(){
  return gulp.src('app/pugfiles/**/*.pug')
    .pipe(pug())
    .pipe(gulp.dest('app/dist/'))
    .pipe(browserSync.reload({stream:true}));
});

/*
 * Compile SASS
 */
gulp.task('sass', function(){
  return gulp.src('app/assets/**/*.sass')
    .pipe(sass().on('error', sass.logError))
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
 * Minify Images
 */
 gulp.task('imagemin', function(){
  return gulp.src('app/assets/media/**/*')
    .pipe(gulp.dest('app/dist/media'))
    .pipe(browserSync.reload({stream:true}));
 });

/*
 * Watch
 */
gulp.task('watch', function(){
  gulp.watch('app/assets/**/*.sass', ['sass'])
  gulp.watch('app/assets/media/**/*', ['imagemin'])
  gulp.watch('app/assets/js/**/*.js', ['js'])
  gulp.watch('app/pugfiles/**/*.pug', ['pug']);
});

/*
 * Default Task
 */
gulp.task('default', ['server']);