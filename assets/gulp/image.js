const gulp = require('gulp');
const pipeline = require('readable-stream').pipeline;
// converts to webp images
const webp = require('gulp-webp');
gulp.task('webp', () =>
  pipeline(
    gulp.src('public/**/*.{png,jpg}'),
    webp({
      verbose: true
    }),
    gulp.dest('public/')
  )
);

const imagemin = require('gulp-imagemin');
gulp.task('image', () =>
  pipeline(
    gulp.src([
      'public/**/*.{png,jpg,gif,svg}'
    ]),
    imagemin([
      imagemin.gifsicle({
        interlaced: true
      }),
      imagemin.mozjpeg({
        quality: 75,
        progressive: true
      }),
      imagemin.optipng({
        optimizationLevel: 5
      }),
      imagemin.svgo({
        plugins: [{
            removeViewBox: true
          },
          {
            cleanupIDs: false
          }
        ]
      })
    ]),
    gulp.dest('public/')
  )
);
