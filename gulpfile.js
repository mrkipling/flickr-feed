var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    cache = require('gulp-cache'),
    concat = require('gulp-concat'),
    jshint = require('gulp-jshint'),
    less = require('gulp-less'),
    minifycss = require('gulp-minify-css'),
    react = require('gulp-react'),
    rimraf = require('gulp-rimraf'),
    uglify = require('gulp-uglify'),
    watch = require('gulp-watch');

var paths = {
    styles: {
        lib: ['./assets/css/lib/**'],
        site: ['./assets/css/site/base.less']
    },
    scripts: {
        lib: ['./assets/js/lib/react-with-addons.js',
              './assets/js/lib/react-mini-router.js',
              './assets/js/lib/JSONP.js'],
        site: ['./assets/js/site/init.jsx',
               './assets/js/site/components/**.jsx',
               './assets/js/site/render.jsx']
    }
};





/*--- styles ---*/

gulp.task('styles_lib', function() {
    return gulp.src(paths.styles.lib)
        .pipe(less())
        .pipe(concat('lib.css'))
        .pipe(minifycss())
        .pipe(gulp.dest('./site/static/css'));
});

gulp.task('styles_site', function() {
    return gulp.src(paths.styles.site)
        .pipe(less())
        .on('error', handleError)
        .pipe(autoprefixer())
        .pipe(concat('site.css'))
        .pipe(minifycss())
        .pipe(gulp.dest('./site/static/css'));
});





/*--- scripts ---*/

gulp.task('scripts_lib', function() {
    return gulp.src(paths.scripts.lib)
        .pipe(concat('lib.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./site/static/js'));
});

gulp.task('scripts_site', function() {
    return gulp.src(paths.scripts.site)
        .pipe(react())
        .on('error', handleError)
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(concat('site.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./site/static/js'));
});





/*--- clean ---*/

gulp.task('clean', function() {
    return gulp.src(['./site/static/css', './site/static/js'], { read: false })
        .pipe(rimraf());
});





/*--- handle errors gracefully ---*/

function handleError(err) {
    console.log(err.toString());
    if (watching) {
        this.emit('end');
    } else {
        process.exit(1);
    }
}





/*--- watch ---*/

var watching = false;

gulp.task('watch', function () {
    watching = true;
    gulp.watch('./assets/css/lib/**', ['styles_lib']);
    gulp.watch('./assets/css/site/**', ['styles_site']);
    gulp.watch('./assets/js/lib/**', ['scripts_lib']);
    gulp.watch('./assets/js/site/**', ['scripts_site']);
});





/*--- default task ---*/

gulp.task('default', ['clean'], function() {
    gulp.start('styles_lib',
               'styles_site',
               'scripts_lib',
               'scripts_site');
});
