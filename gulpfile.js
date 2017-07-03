var gulp = require('gulp');
var runSequence = require('run-sequence');
var concat = require('gulp-concat');
var minifyCss = require('gulp-minify-css');
var sourcemaps = require('gulp-sourcemaps');
var rev = require('gulp-rev');
var uglify = require('gulp-uglify');
var pump = require('pump');
var htmlmin = require('gulp-htmlmin');
var inject = require('gulp-inject');
var path = require('path')

var fse = require('fs-extra');

// Set this prefix if you want to deploy resources to CDN or other server
// Please do be careful of the end of /
var url_prefix = "./"

const liblist = [
    "./node_modules/vue/dist/vue.js",
    "./node_modules/vue-router/dist/vue-router.js",
    "./node_modules/jquery/dist/jquery.min.js",
    "./node_modules/materialize-css/dist/js/materialize.min.js"];

const liblist_prod = [
    "./node_modules/vue/dist/vue.min.js",
    "./node_modules/vue-router/dist/vue-router.min.js",
    "./node_modules/jquery/dist/jquery.min.js",
    "./node_modules/materialize-css/dist/js/materialize.min.js"];



gulp.task('dev',function () {
    return gulp.src(liblist)
        .pipe(sourcemaps.init())
        .pipe(concat('lib.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./static/js/'));
});

gulp.task('compress-lib',function (cb) {
    pump([
            gulp.src(liblist_prod),
            concat('vendor.lib.js'),
            uglify(),
            rev(),
            gulp.dest('./dist/static/js/')
        ],
        cb
    );
});

gulp.task('prepare-dist-dir',function () {
    fse.ensureDirSync(path.join(__dirname,'dist'));
    fse.emptyDirSync(path.join(__dirname,'dist'));
});

gulp.task('compress-router',function (cb) {
    pump([
            gulp.src('./static/js/router.js'),
            // uglify(),
            rev(),
            gulp.dest('./dist/static/js/')
    ],cb);
});

gulp.task('compress-css',function (cb) {
    pump([
        gulp.src(['./static/css/main.css','./node_modules/materialize-css/dist/css/materialize.min.css']),
        concat('style.css'),
        minifyCss(),
        gulp.dest('./dist/static/css/')
    ],cb);
});

gulp.task('copy-other-res',function () {
    fse.copySync(path.join(__dirname,'node_modules','materialize-css','dist','fonts'),path.join(__dirname,'dist','static','fonts'))
});

gulp.task('copy-index',function () {
    return gulp.src('./index.html')
        .pipe(gulp.dest('./dist/'));
});

gulp.task('publish-inject',function (){
    return gulp.src('./dist/index.html')
        .pipe(inject(gulp.src('./dist/static/js/*.lib.js', {read: false}), {starttag: '<!-- inject:head:{{ext}} -->',relative:true,addPrefix:url_prefix}))
        .pipe(inject(gulp.src(['./dist/static/js/*.js','!./dist/static/js/*.lib.js'], {read: false}),{relative:true,addPrefix:url_prefix}))
        .pipe(inject(gulp.src('./dist/static/css/*.css',{read:false}),{relative:true,addPrefix:url_prefix}))
        // .pipe(htmlmin({collapseWhitespace:true,removeComments:true}))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('publish',function(){
    runSequence(
        'prepare-dist-dir',
        'compress-lib',
        'compress-router',
        'compress-css',
        'copy-other-res',
        'copy-index',
        'publish-inject'
    );
});

