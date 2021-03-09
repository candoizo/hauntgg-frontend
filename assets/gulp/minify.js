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
        passes: 3,
        drop_console: true
      },
      toplevel: true,
      warnings: true,
      // safari10: true,
      mangle: {
        toplevel: true
      }
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
