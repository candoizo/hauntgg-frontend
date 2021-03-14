const gulp = require('gulp');
const pipeline = require('readable-stream').pipeline;
const uglify = require('gulp-uglify-es').default;
const htmlmin = require('gulp-htmlmin');

gulp.task('uglify', () =>
  pipeline(
    gulp.src('public/**/*.js'),
    uglify({
      ecma: "2017",
      compress: {
        passes: 2,
        drop_console: false,//true,
        keep_fnames: true
      },
      toplevel: false,
      warnings: true,
      // safari10: true,
      mangle: {
        toplevel: false,
        keep_fnames: true,
      },
      keep_fnames: true
    }),
    gulp.dest('public/')
  )
);

gulp.task('minify', () =>
  pipeline(
    gulp.src('public/**/*.html'),
    htmlmin({
      collapseWhitespace: true,
      removeAttributeQuotes: true,
      removeComments: true
    }),
    gulp.dest('public')
  )
);
