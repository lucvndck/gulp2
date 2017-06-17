var gulp = require('gulp'),
    gutil = require('gulp-util'),
    compass = require('gulp-compass'),
    connect = require('gulp-connect'),
    livereload = require('gulp-livereload');

var sassSources = ['components/sass/style.scss'];

gulp.task('compass', function() {
    gulp.src(sassSources)
        .pipe(compass({
            sass: 'components/sass',
            image: 'development/img',
            style: 'expanded'
        })
        .on('error', gutil.log))
        .pipe(gulp.dest('development/css'))
        .pipe(connect.reload());
});

gulp.task('watch', function() {
    gulp.watch('components/sass/*.scss', ['compass']);
    gulp.watch(['development/*.html'], ['html']);
});

gulp.task('connect', function() {
    connect.server({
        root: 'development',
        livereload: true
    });
});

gulp.task('html', function () {
    gulp.src('development/*.html')
        .pipe(connect.reload());
});

gulp.task('default', ['compass', 'html', 'connect', 'watch']);
