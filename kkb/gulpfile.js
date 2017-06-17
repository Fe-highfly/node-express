'use strict';
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    fs = require('fs'),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    browserSync = require('browser-sync'),
    useref = require('gulp-useref'),
    uglify = require('gulp-uglify'),
    minicss = require('gulp-minify-css'),
    path = require('path'),
    // if = require('gulp-if')
    rev = require('gulp-rev'),
    revReplace = require('gulp-rev-replace'),
    revCollector = require('gulp-rev-collector'),
    reload = browserSync.reload,
    pngquant = require('imagemin-pngquant'),
    imagemin = require('gulp-imagemin');


var nodemon = require('gulp-nodemon');

var cmdArgs = new Map();
process.argv.slice(2).forEach((val, key) => {
    var item = val.split('='),
        name = item[0],
        v = item.length == 2 ? item[1] : true;
    cmdArgs.set(name, v);
});

var getArg = (name) => {
    return cmdArgs.get(`--${name}`);
}

//图片的压缩
gulp.task('Imagemin', function() {
    gulp.src('public/img/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }], //不要移除svg的viewbox属性
            use: [pngquant()] //使用pngquant深度压缩png图片的imagemin插件
        }))
        .pipe(rev())
        .pipe(gulp.dest('public/img'))
        .pipe(gulp.manifest())
        .pipe(gulp.dest('./rev'));
});
//文件的替换
gulp.task('rev', function() {
    gulp.src(['./rev/*.json', './views/**/*.swig']) //- 读取 rev-manifest.json 文件以及需要进行css名替换的文件
        .pipe(revCollector()) //- 执行文件内css名的替换
        .pipe(gulp.dest('./application/')); //- 替换后的文件输出的目录
});
// 样式文件处理
gulp.task('styles', ['move-fonts'], function() {
    var bs = path.resolve('./public/bower_components/bootstrap-sass/');
    // 编译 css
    return gulp.src(['client/sass/**/*.scss', '!client/sass/**/_*.scss'])
        .pipe(sass({
            includePaths: [bs + '/assets/stylesheets'],
            errLogToConsole: true,
            sourceComments: true
        }).on('error', sass.logError))
        //.pipe(sourcemaps.init())
        .pipe(autoprefixer({ browsers: ['last 2 versions', 'ie 8-11', 'Firefox ESR'] }))
        //.pipe(sourcemaps.write())
        .pipe(gulp.dest('client/css'))
        .pipe(gulp.dest('public/css'))
        .pipe(reload({ stream: true }));
});

gulp.task('styles-build', function() {
    var bs = path.resolve('./public/bower_components/bootstrap-sass/');
    // 编译 css
    return gulp.src(['client/sass/**/*.scss', '!client/sass/**/_*.scss'])
        .pipe(sass({
            includePaths: [bs + '/assets/stylesheets'],
            mingle: true
        }).on('error', sass.logError))
        //.pipe(sourcemaps.init())
        .pipe(autoprefixer({
            remove: false,
            browsers: ['last 2 versions', 'ie 8-11', 'Firefox >= 40', 'last 3 Safari versions']
        }))
        .pipe(minicss())
        //.pipe(sourcemaps.write())
        .pipe(gulp.dest('public/css'))
        .pipe(gulp.dest('client/css'))
});

// js文件处理
gulp.task('scripts', function() {
    return gulp.src(['client/js/**/*.js',
            'client/js/**/*.css',
            'client/js/**/*.png',
            'client/js/**/*.jpg'
        ])
        // .pipe($.plumber())
        .pipe(gulp.dest('public/js'))
        .pipe(reload({ stream: true }));
});

// js文件处理
gulp.task('scripts-build', ['revbud'], function() {
    var condition = function(file) {
        return !/\.min/.test(file.path);
    }

    return gulp.src(['client/js/**/*.js'])
        // .pipe($.plumber())
        .pipe(gulpif(condition, uglify({ mingle: true })
            .on('error', function(e) {
                console.log(e);
            })
        ))
        .pipe(rev())
        .pipe(gulp.dest('public/js'))
        .pipe(rev.manifest({})) //- 生成一个rev-manifest.json
        .pipe(gulp.dest('revbud'));
});
gulp.task('revbud', function() {
    gulp.src(['revbud/*.json', 'views/**']) //- 读取 rev-manifest.json 文件以及需要进行css名替换的文件
        .pipe(revCollector({
            //replaceReved: true
        }))
        .pipe(gulp.dest('public/views')); //- 替换后的文件输出的目录
});

var useref = require('gulp-useref');
var gulpif = require('gulp-if');

gulp.task("move-template", function() {
    // 拷贝模板文件
    return gulp.src('client/views/**')
        .pipe(gulp.dest('views'));
});

gulp.task("move-fonts", function() {
    gulp.src(['client/fonts/fonts/**'])
        .pipe(gulp.dest('public/css/fonts'));
    // 拷贝字体文件
    return gulp.src(['client/fonts/edtor/**'])
        .pipe(gulp.dest('public/fonts'));
});

// bower 依赖
gulp.task('build-template', [
    // 'move-template',
    'move-fonts',
    'styles-build',
    'scripts-build'
], function() {
    return gulp.src('client/views/layout/default.html')
        .pipe(useref({
            searchPath: ['public', 'client']
        }))
        .pipe(gulpif('*.js', uglify()
            .on('error', function(e) {
                console.log(e);
            })
        ))
        .pipe(gulpif('*.css', autoprefixer({
            remove: false,
            browsers: ['last 2 versions', 'ie 8-11', 'Firefox >= 40', 'last 3 Safari versions']
        })))
        .pipe(gulpif('*.css', minicss(

        )))
        .pipe(gulpif('*.html', gulp.dest('views/layout')))
        .pipe(gulp.dest('public/'));
})

gulp.task('build', ['build-template'], function() {
    // 删除多余文件
    fs.unlink(__dirname + '/public/default.html', function() {});

    gulp.src('client/img/**')
        .pipe(gulp.dest('public/img'));
    gulp.src(['client/bower_components/**'])
        .pipe(gulp.dest('public/bower_components'));
    gulp.src('client/fonts/editor/**')
        .pipe(gulp.dest('public/fonts/editor'));

    gulp.start("increment");
});

let cp = require("child_process");
/**
 * server 
 * -- host
 * @return {[type]}      [description]
 */
gulp.task('serve', ['styles', 'scripts', 'nodemon'], () => {
    let opt = {
        notify: true,
        proxy: "http://127.0.0.1:3030",
        port: 9910,
        open: true
    };

    browserSync(opt);

    gulp.watch("client/sass/**/*.scss", ['styles']);

    gulp.watch(["client/**/*.html", "/client/**/*.js"], (evt, file) => {
        browserSync.reload();
    });

    gulp.watch("src/**", () => {
        cp.exec('npm run babel' /*command*/ , {} /*options, [optiona]l*/ , function(err, stdout, stderr) {
            console.log('stdout: ' + stdout);
            if (stderr) {
                console.log('stderr: ' + stderr);
            }
        })
    })
});

/**
 * increment build version
 * @param  {[type]} ){} [description]
 * @return {[type]}       [description]
 */
gulp.task('increment', function() {
    var version = null;
    try {
        version = require("./version.json");
    } catch (e) {
        version = { build: "1.0.0" };
    }

    if (!(version && version.build.match(/^\d+\.\d+\.\d+$/))) {
        version = { build: "1.0.0" };
    }

    var maxVer = 10000;
    var ver = version.build.split("."),
        current = 2;

    while (current > 0 && ver[current]++ >= maxVer) {
        ver[current] = 0, current--;
        if (current == 1) {
            ver[0]++;
        }
    }
    console.log("build: ", ver.join("."));
    var fd = path.join(__dirname, "version.json");
    fs.writeFileSync(fd, JSON.stringify({ build: ver.join(".") }));
});

gulp.task('nodemon', function(cb) {
    var started = false;
    var args = process.argv;

    let opts = {
        script: 'app.js',
        colours: true,
        args: args.slice(3),
        ignore: [
            'node_modules/',
            'cache',
            'client',
            'src',
            "public"
        ],
        env: { 'NODE_ENV': 'development' },
    }

    if (getArg('inspect')) {
        opts.exec = 'node-inspector & node --debug';
    }

    return nodemon(opts).on('start', function() {
        // to avoid nodemon being started multiple times
        // thanks @matthisk
        if (!started) {
            cb();
            started = true;
        }
    });
});