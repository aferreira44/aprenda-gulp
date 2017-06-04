var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    htmlmin = require('gulp-htmlmin'),
    runSequence = require('run-sequence'),
    rename = require('gulp-rename'),
    cleanCss = require('gulp-clean-css');

gulp.task('clean', function () {
    return gulp
        .src('dist/')
        .pipe(clean());
});

gulp.task('copyIndex', function () {
    return gulp
        .src('./index-prod.html')
        .pipe(rename('./index.html'))
        .pipe(gulp.dest('./dist'));
});

gulp.task('copyFonts', function () {
    return gulp
        .src(['./fonts/*', 'node_modules/bootstrap/fonts/*', 'node_modules/font-awesome/fonts/*'])
        .pipe(gulp.dest('./dist/fonts'));
});

gulp.task('jshint', function () {
    return gulp
        .src('js/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('uglifyJs', function () {
    return gulp
        .src(['node_modules/jquery/dist/jquery.min.js', 'js/**/*.js', 'node_modules/jquery-ui-dist/jquery-ui.min.js', 'node_modules/bootstrap/dist/js/bootstrap.min.js'])
        .pipe(uglify())
        .pipe(concat('scripts.min.js'))
        .pipe(gulp.dest('./dist/js'));
});

gulp.task('cleanCss', function () {
    return gulp
        .src(['node_modules/bootstrap/dist/css/bootstrap.min.css', 'node_modules/font-awesome/css/font-awesome.min.css', './style/**/*.css'])
        .pipe(cleanCss({rebase: false}))
        .pipe(concat('styles.min.css'))
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('copyImg', function () {
    return gulp
        .src('./image/*')
        .pipe(gulp.dest('./dist/img'));
});

gulp.task('htmlmin', function () {
    return gulp
        .src(['./*.html', './dist/index.html', '!./index.html', '!./index-prod.html'])
        .pipe(htmlmin({
            collapseWhitespace: true,
            collapseInlineTagWhitespace: true,
            removeComments: true,
            minifyCSS: true,
            minifyJS: true,
            minifyURLs: true,
            removeEmptyAttributes: true,
            sortAttributes: true,
            sortClassName: true
        }))
        .pipe(gulp.dest('./dist'));
});

gulp.task('default', function (callback) {
    return runSequence('clean', 'copyIndex', [
        'jshint',
        'copyFonts',
        'uglifyJs',
        'cleanCss',
        'copyImg',
        'htmlmin'
    ], callback);
});