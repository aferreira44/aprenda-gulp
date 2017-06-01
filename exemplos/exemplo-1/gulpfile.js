var gulp = require('gulp');
var jshint = require('gulp-jshint');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var cleanCss = require('gulp-clean-css');
var runSequence = require('run-sequence');
var rename = require('gulp-rename');

gulp.task('clean', function () {
    return gulp.src('dist/')
        .pipe(clean());
});

gulp.task('copyIndex', function () {
    return gulp.src('./index-prod.html')
        .pipe(rename('./index.html'))
        .pipe(gulp.dest('./dist'));
});

gulp.task('copyFonts', function () {
    return gulp.src('./fonts/*')
        .pipe(gulp.dest('./dist/fonts'));
});

gulp.task('jshint', function () {
    return gulp.src('js/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('uglify', function () {
    return gulp.src(['node_modules/jquery/dist/jquery.min.js','js/**/*.js', 'node_modules/jquery-ui-dist/jquery-ui.min.js', 'node_modules/bootstrap/dist/js/bootstrap.min.js'])
        .pipe(uglify())
        .pipe(concat('scripts.min.js'))
        .pipe(gulp.dest('./dist/js'));
});

gulp.task('cleanCss', function () {
    return gulp.src(['node_modules/bootstrap/dist/css/bootstrap.min.css', 'node_modules/font-awesome/css/font-awesome.min.css', './style/**/*.css'])
        .pipe(cleanCss())
        .pipe(concat('styles.min.css'))
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('copyImg', function () {
    return gulp.src('./image/*')
        .pipe(gulp.dest('./dist/image'));
});

gulp.task('htmlmin', function () {
    return gulp.src(['./*.html', './dist/index.html', '!./index.html', '!./index-prod.html'])
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
    return runSequence('clean', 'copyIndex', ['jshint', 'copyFonts', 'uglify', 'cleanCss', 'copyImg', 'htmlmin'], callback);
});