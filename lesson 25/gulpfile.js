const {series, src, dest, watch} = require('gulp');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const inject = require('gulp-inject');

function copy() {
  return src('src/*.html')
    .pipe(dest('dist/'))
}

function concatJS() {
  return src('./src/*.js')
    .pipe(concat('all.js'))
    .pipe(dest('./dist/'));  
}

function convertSass() {
  return src('./src/**/*.scss')
    .pipe(sass())
    .pipe(dest('./dist/'));
}

function injectLinks() {
  const target = src('./src/index.html');
  const sources = src(['./dist/all.js', './dist/**/*.css'], {read: false});
  return target.pipe(inject(sources))
               .pipe(dest('./dist/')); 
}

function watchFiles() {
  return watch('./src/*.html', series(copy, injectLinks)),
         watch('./src/**/*.scss', convertSass),
         watch('./src/*.js', concatJS);
}

module.exports.build = series(concatJS, convertSass, injectLinks);
module.exports.dev = watchFiles;