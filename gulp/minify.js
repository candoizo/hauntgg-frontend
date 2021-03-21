const gulp = require('gulp');
const pipeline = require('readable-stream').pipeline;
// const uglify = require('gulp-uglify-es').default;
const htmlmin = require('gulp-htmlmin');
//
// gulp.task('uglify', () =>
//   pipeline(
//         gulp.src('public/**/*.js'),
//         uglify({
//           warnings: true,
//           safari10: true,
//           mangle: {
//             // toplevel: true
//           }
//           // toplevel: true
//         }),
//         gulp.dest('public/')
//   )
// );
//
gulp.task('minify', () =>
  pipeline (
    gulp.src('hugo/public/**/*.html'),
    htmlmin({
      collapseWhitespace: true,
      removeAttributeQuotes: true,
      removeComments: true
      // decodeEntities: true
    }),
    gulp.dest('hugo/public')
  )
);
//
// // const critical = require('critical');
// // gulp.task('critical', () =>
// //     critical.generate({
// //         inline: true,
// //         base: './public/',
// //         src: './index.html',
// //         dest: './index-critical.html',
// //         minify: true,
// //         width: 374,
// //         height: 812
// //     })
// // );
