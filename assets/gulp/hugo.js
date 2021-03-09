/* eslint-env node */
const gulp = require('gulp');
const pipeline = require('readable-stream').pipeline;
const pug = require('gulp-pug');
// const rimraf = require('rimraf');
// const changed = require('gulp-changed');
// const debug = require('gulp-debug');
const gulp_rimraf = require('gulp-rimraf');

gulp.task('layout_clean', () => {
  return pipeline(
    gulp.src('layous/**/*.html'),
    gulp_rimraf()
  );
});

gulp.task('hugopug', gulp.series('layout_clean', () => {

  return pipeline(
    gulp.src('assets/pug/**/*.pug'),
    pug(),
    gulp.dest('layouts/')
  );
}));

const execa = require('gulp-execa').exec;
gulp.task('hugo', async () => {

  // builddrafts creates the uncss page
  await execa(`hugo -d test --debug --buildDrafts`);
  return await execa(`hugo --environment ${process.env.NODE_ENV || "dev"} --debug`);

});

const beautify = require('gulp-beautify');
const files = ['assets/**/*.js'];
gulp.task('beautify', (cb) => {
  return pipeline(
    gulp.src(files),
    beautify({
      "indent_size": 2,
      "indent_char": " ",
      "indent_level": 0,
      "indent_with_tabs": false,
      "preserve_newlines": true,
      "max_preserve_newlines": 2,
      "jslint_happy": true,
      "end_with_newline": true
    }),
    gulp.dest('assets/', cb())
  );
});

gulp.task('pugo',
  gulp.series(
    'hugopug',
    'beautify',
    () => {
      gulp.watch(['./assets/pug/**/*.pug'], gulp.task('hugopug'));
      // gulp.watch(files, {
      //   delay: 30000
      // }, gulp.task('beautify'));
      return execa('hugo server --bind 0.0.0.0')
    },
  )
);
