var gulp = require('gulp'),
		jade = require('gulp-jade'),
		cssnano = require('gulp-cssnano'),
		connect = require('gulp-connect');
		sass = require('gulp-sass');
    autoprefixer = require('gulp-autoprefixer');
    csscomb = require('gulp-csscomb');
    imagemin = require('gulp-imagemin');

// Jade
gulp.task('jade', function(){
	gulp.src('./assets/jade/*.jade')
		.pipe(jade({
			pretty: true
		}))
		.pipe(gulp.dest('./public'))
		.pipe(connect.reload());
});


gulp.task('sass', function () {
  return gulp.src('./assets/**/*.sass')
    .pipe(autoprefixer({
            browsers: ['last 1 versions'],
            cascade: false
    }))
    .pipe(sass({
      includePaths: require('node-bourbon').includePaths,
      includePaths: require('node-neat').includePaths
    }).on('error', sass.logError))
    .pipe(csscomb())
    .pipe(gulp.dest('./public/'))
    .pipe(connect.reload());
});

gulp.task('image', () =>
    gulp.src('./assets/img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./public/img'))
);

// Minify JS
gulp.task('js', function() {
  	gulp.src('assets/**/*.js')
    .pipe(gulp.dest('./public/'))
   	.pipe(connect.reload());
});

// Watch
gulp.task('watch', function (){
	gulp.watch('./assets/**/*.js', ['js'])
	gulp.watch('./assets/jade/**/*.jade', ['jade']);
  gulp.watch('./assets/img/*', function(event) {
    gulp.run('image');
  });
});

gulp.task('sass:watch', function () {
  gulp.watch('./assets/**/*.sass', ['sass']);
});

// Server
gulp.task('connect', function() {
  connect.server({
    root: 'public',
    livereload: true
  });
});

gulp.task('default', ['jade', 'sass', 'js', 'watch', 'sass:watch', 'connect', 'image'])