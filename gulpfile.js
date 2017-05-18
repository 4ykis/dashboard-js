//$ sudo npm install --save-dev gulp
//$ sudo npm install --save-dev gulp-clean-css
//$ sudo npm install --save-dev gulp-imagemin
//$ sudo npm install --save imagemin-pngquant
//$ sudo npm install --save-dev gulp-uglify
//$ sudo npm install --save-dev gulp-sass
//$ sudo npm install --save-dev gulp-rigger
//$ sudo npm install --save-dev gulp-rename
//$ sudo npm install --save-dev gulp-watch
//$ sudo npm install --save-dev rimraf
//$ sudo npm install --save-dev gulp-concat
//$ sudo npm install --save-dev gulp-cssmin
//$ sudo npm install --save-dev gulp-autoprefixer

'use strict';

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    rigger = require('gulp-rigger'),
    rename = require("gulp-rename"),
    cssclean = require('gulp-clean-css'),
    imagemin = require('gulp-imagemin'),
    cssmin = require('gulp-cssmin'),
    concat = require('gulp-concat'),
    autoprefixer = require('gulp-autoprefixer'),
    pngquant = require('imagemin-pngquant'),
    gutil = require('gulp-util'),
    rimraf = require('rimraf');

var path = {
    build: {
        html: './',
        js: 'assets/js/',
        css: 'assets/css/',
        scss: './assets/scss/',
        sass:'./assets/scss/',
        img: 'assets/img/',
        fonts: 'assets/fonts/'
    },
    src: {
        html: 'src/*.html',
        js: 'src/js/main.js',
        css: 'src/css/**/*.*',
        scss: 'src/scss/**/*.*',
        sass: 'src/scss/**/*.scss',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    watch: {
        html: 'src/**/*.html',
        js: 'assets/js/**/*.js',
        css: 'assets/css/**/*.*',
        scss: 'assets/scss/**/*.*',
        sass: 'assets/scss/**/*.scss',
        img: 'assets/img/**/*.*',
        fonts: 'assets/fonts/**/*.*'
    },
    clean: './assets',
    cleanHtml:'./*.html'
};

gulp.task('clean', function (cb) {
    rimraf(path.cleanHtml, cb);
});

gulp.task('html:build', function () {
    gulp.src(path.src.html)
        .pipe(rigger())
        .pipe(gulp.dest(path.build.html));
});

gulp.task('js:build', function () {
    gulp.src(['./assets/js/vendor/jquery-1.12.0.min.js','./assets/js/vendor/!(jquery-1.12.0.min)*.js'])
        //.pipe(rigger())
        //.pipe(uglify())
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest(path.build.js));
});

gulp.task('sass:build', function () {
    gulp.src('./assets/scss/**/*.scss')
        .pipe(sass().on('error', function(e) {
            gutil.log(e);
        }))
        .pipe(autoprefixer({
            browsers: ['last 3 versions'],
            cascade: false
        }))
        .pipe(cssclean())
        .pipe(gulp.dest('./assets/css/'));
});

gulp.task('image:build', function () {
    gulp.src(path.build.img)
        .pipe(imagemin({
            progressive: true,
            svgPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.build.img));
});

gulp.task('css:build', function () {
    gulp.src(['./assets/css/vendor/*.css'])
        .pipe(concat('vendor.css'))
        //.pipe(cssmin())
        .pipe(cssclean())
        .pipe(gulp.dest('./assets/css/'));
});

gulp.task('build', [
    'html:build',
    'js:build',
    'sass:build',
    'css:build',
    'image:build'
]);


gulp.task('watch', function(){
    watch([path.watch.html], function(event, cb) {
        gulp.start('html:build');
    });
    watch([path.watch.sass], function(event, cb) {
        gulp.start('sass:build');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js:build');
    });
    watch([path.watch.img], function(event, cb) {
        gulp.start('image:build');
    });
});


gulp.task('default', [ 'build', 'watch']);