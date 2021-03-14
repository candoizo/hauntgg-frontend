const gulp = require('gulp');
const webpack = require('webpack-stream');
const pipeline = require('readable-stream').pipeline;

gulp.task('webpack', () =>
  pipeline(
    gulp.src('./assets/js/webpack/bootstrap.js'),
    webpack(require('../../webpack.config')),
    gulp.dest('./public/dist/')
  )
);
