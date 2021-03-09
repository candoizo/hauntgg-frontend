/* eslint-env node */
require('require-dir')('./gulp') //('./assets/gulp');
const debug = require('debug')('*');
const gulp = require('gulp');
const pipeline = require('readable-stream').pipeline;
const gulp_rimraf = require('gulp-rimraf');

let isProd = () => {
  let b = process.env.NODE_ENV === 'release';
  if (b) debug('[!] Production build!')
  return b
};

gulp.task('public_clean', () => {
  return pipeline(
    gulp.src(['public/', 'test/'], {
      allowEmpty: true
    }),
    gulp_rimraf()
  );
});

const development = [
  gulp.task('public_clean'), // rm public
  gulp.task('hugopug'), // rm layouts, assets/pug/** ➡️ coinvanity
  gulp.task('hugo'), // layouts/** ➡️ public
];

const production = [
  ...development,
  gulp.parallel([
    gulp.task('generate-favicon'),
    gulp.task('uglify'),
    gulp.task('webp')
  ]),
  gulp.parallel([
    gulp.task('inject-favicon-markups'),
    gulp.task('image')
  ]),
  gulp.task('minify'),
];

// Used to build the hugo site
gulp.task('build',
  gulp.series(
    isProd() ?
    production :
    development
  )
);

const browserSync = require('browser-sync').create();
gulp.task('serve', gulp.series('build', () => {
  browserSync.init({
    bind: "0.0.0.0",
    open: false,
    port: 1313,
    notify: false,
    server: {
      baseDir: './public'
    },
    reloadDelay: 1000,
    reloadDebounce: 1000
  });
  // when pug is changed
  gulp.watch([
    './assets/pug/**/*',
  ], gulp.series([
    gulp.task('hugopug'),
    gulp.task('hugo'),
    // gulp.task('csshashmap')
  ])).on('change', browserSync.reload);
  // when markdown content / hugo config changed
  gulp.watch([
    './content/**/*',
    './assets/js/**/*.js',
    './config/**/*.yml',
    // './assets/scss/**.s(c|a)ss'
  ], gulp.series([
    gulp.task('hugo'),
    // gulp.task('csshashmap')
  ])).on('change', browserSync.reload);
  // when css is updated
  gulp.watch([
    './assets/css/*.css',
    './assets/scss/**/*',
    './tailwind.config.js'
  ], gulp.series([
    gulp.task('hugo')
    // gulp.task('gocss'),
  ])).on('change', browserSync.reload);
}));
