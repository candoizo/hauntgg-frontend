const gulp = require('gulp');
require('require-dir')('./gulp')

gulp.task('favicon', gulp.series([
  gulp.task('generate-favicon'),
    gulp.task('inject-favicon-markups'),
    // gulp.task('image')
  ]),
);
