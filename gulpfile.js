var gulp = require('gulp')
var webpackStream = require('webpack-stream')
var reload = require('gulp-hot-reload')
var webpack = require('webpack')
var gutil = require('gulp-util')
var path = require('path')
var rsync = require('gulp-rsync')

const buildDone = (err, stats) => {
  if(err) throw new gutil.PluginError("webpack", err);
  gutil.log('[webpack]', stats.toString({
    colors: true,
    chunkModules: false,
    assets: false,
    version: false,
    hash: false
  }))
}

var serverConfig = require('./webpack.server.config.js')
var frontendConfig = require('./webpack.config.js')
var frontendConfigProd = require('./webpack.config.production.js')

gulp.task('build-backend', () => {
  gulp
    .src('./src/server.js')
    .pipe(webpackStream(serverConfig, webpack, buildDone))
    .pipe(reload({
      port: 1337,
      react: true,
      config: path.join(__dirname, 'webpack.config.js')
    }))
})

gulp.task('watch', function () {
  gulp.watch('src/**/*.js', ['build-backend'])
})

gulp.task('dist-backend', function () {
  process.env.NODE_ENV = 'production'
  gulp
    .src('./src/server.js')
    .pipe(webpackStream(serverConfig, webpack, buildDone))
    .pipe(gulp.dest('build'))
})

gulp.task('dist-frontend', function () {
  process.env.NODE_ENV = 'production'
  gulp
    .src('./src/application.js')
    .pipe(webpackStream(frontendConfigProd, webpack, buildDone))
    .pipe(gulp.dest('dist'))
})

gulp.task('dist', ['dist-frontend'], function() {

})

gulp.task('default', ['build-backend', 'watch'], function () {
  gutil.log('watch')
})

gulp.task('deploy', ['dist'], function() {
  gulp.src('dist/**')
    .pipe(rsync({
      root: 'dist/',
      hostname: 'carbon.amers2.cis.trcloud',
      destination: '/home/dreed/www/wc_pep_taxonomy_trainer'
    }))
});
