var gulp = require('gulp'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    cssmin = require('gulp-cssmin'),
    rename = require('gulp-rename'),
    clean = require('gulp-rimraf');

gulp.task('clean', [], function() {
    console.log("Clean all files in build folder");

    return gulp.src("public/assets/build/*", { read: false }).pipe(clean());
});

gulp.task('sass', function() {
    return gulp.src('public/assets/scss/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('public/assets/css'))
});

gulp.task('cssmin', function () {
    gulp.src('public/assets/css/**/*.css')
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('public/assets/build/min'));
});

gulp.task('jsmin', function() {
    gulp.src('public/assets/js/*.js')
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('public/assets/build/min'));
});

gulp.task('watch', function(){
    gulp.watch('public/assets/scss/**/*.scss', ['sass']);
    // Other watchers
});
gulp.task('default', ['sass', 'watch']);

gulp.task('prodcss', ['sass','cssmin', 'watch']);

gulp.task('production', ['clean','cssmin', 'jsmin']);