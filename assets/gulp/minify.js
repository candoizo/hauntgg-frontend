const gulp = require('gulp');
const pipeline = require('readable-stream').pipeline;
const uglify = require('gulp-uglify-es').default;
const htmlmin = require('gulp-htmlmin');

gulp.task('uglify', () =>
  pipeline(
    gulp.src('public/**/*.js'),
    uglify({
      ecma: "2018",
      compress: {
        passes: 3,
        drop_console: true,
        // keep_fnames: true
      },
      // toplevel: false,
      warnings: true,
      // safari10: true,
      mangle: {
        // toplevel: false,
        // keep_fnames: true,
      },
      // keep_fnames: true
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
