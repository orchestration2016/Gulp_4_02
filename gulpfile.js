var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var concat = require('gulp-concat');

//  TOP LEVEL FUNCTIONS
// gulp.task - Define tasks
// gulp.src - Point tofiles to use
// gulp.dest - Points to folder to output
// gulp.watch - watch files and folders for changes

//Copy all HTML files
gulp.task('copyHtml',gulp.series(function(){
    return gulp.src('src/*.html')
    .pipe(gulp.dest('dist'));
}));

// // Optimize images
gulp.task('optImage', () =>
gulp.src('src/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images'))
);
// Minify Js
gulp.task('minify',gulp.series(function(){
    return gulp.src('src/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
}));

//Compilesass
gulp.task('sass',gulp.series(function(){
    return gulp.src('src/sass/*.scss')
    .pipe(sass().on('error',sass.logError))
    .pipe(gulp.dest('dist/css'));
}));

//Scripts
gulp.task('scripts',gulp.series(function(){
    return gulp.src('src/js/*.js')
           .pipe(concat('main.js'))
           .pipe(uglify())
           .pipe(gulp.dest('dist/js'));
}));

//Watch
gulp.task('watch',gulp.series(function(){
    gulp.watch(['src/js/*.js'],gulp.parallel(['scripts']));
    gulp.watch(['src/images/*'],gulp.parallel(['optImage']));
    gulp.watch(['src/sass/*.scss'],gulp.parallel(['sass']));
    gulp.watch(['src/*.html'],gulp.parallel(['copyHtml']));
}));

//Default task
gulp.task('default',gulp.series(['copyHtml','optImage','sass','scripts']));