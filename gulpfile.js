const gulp = require('gulp');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const pump = require('pump');
const autoprefixer = require('gulp-autoprefixer');
const rename = require("gulp-rename");
const runSequence = require('run-sequence');
const imagemin = require('gulp-imagemin');
const deletefile = require('gulp-delete-file');
const sourcemaps = require('gulp-sourcemaps');
const livereload = require('gulp-livereload');

const outDir = 'dist';

// Main tasks

gulp.task('default', ['copy-html', 'copy-php', 'compress-css', 'compress-js', 'compress-images', 'fonts']);
gulp.task('prod', ['copy-html', 'copy-php', 'compress-css', 'compress-js', 'compress-images', 'fonts']);
gulp.task('dev', ['copy-html', 'copy-php', 'compress-css', 'compress-js', 'compress-images' , 'fonts', 'watch']);

// Task sequences

gulp.task('compress-css', function(callback) {
  runSequence('sass', 'autoprefixer-css', 'minify-css', function() {
    callback();
  });
});

// All tasks

// gulp.task('sass', function (callback) {
//   pump([
//       gulp.src('src/css/**/*.scss'),
//       sass().on('error', sass.logError),
//       gulp.dest('src/css')
//     ],
//     callback
//   );
// });

gulp.task('sass', function (callback) {
  pump([
      gulp.src('src/scss/*.scss'),
      sass().on('error', sass.logError),
      gulp.dest('src/css')
    ],
    callback
  );
});


gulp.task('autoprefixer-css', function (callback) {
  pump([
      gulp.src(['!src/css/**/*.min.css','src/css/**/*.css']),
      autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
      }),
      gulp.dest('src/css')
    ],
    callback
  );
});

gulp.task('minify-css', function (callback) {
  pump([
      gulp.src(['!src/css/**/*.min.css','src/css/**/*.css'], { base: "src" }),
      cleanCSS({compatibility: 'ie8'}),
      rename({ suffix: '.min' }),
      gulp.dest(outDir),
      livereload()
    ],
    callback
  );
});

gulp.task('fonts', function() {
  return gulp.src([
    'src/fonts/**/*.*'] , { base: "src" })
    .pipe(gulp.dest(outDir));
});


gulp.task('compress-js', function (callback) {

  var options = {
    mangle: {
      toplevel: true,
      eval: true
    },
    output: {
      beautify: false,
      comments: false
    }
  };

  pump([
      gulp.src(['!src/js/**/*.min.js', '!src/js/map.js' ,'src/js/**/*.js'], { base: "src" }),
      sourcemaps.init(),
      uglify(options),
      rename({ suffix: '.min' }),
      sourcemaps.write(),
      gulp.dest(outDir),
      livereload()
    ],
    callback
  );

  gulp.src('src/js/map.js')
    .pipe(gulp.dest(outDir + '/js'));

});

gulp.task('compress-images', function (callback) {
  pump([
      gulp.src(['src/images/**/*'], { base: "src" }),
      imagemin(),
      gulp.dest(outDir)
    ],
    callback
  );
});

gulp.task('copy-html', function(callback) {

  pump([
      gulp.src('src/html/**/*.html', { base: "src/html"}),
      gulp.dest(outDir),
      livereload()
    ],
    callback
  );

});

gulp.task('copy-php', function(callback) {

  pump([
      gulp.src(['!dist/**/*.*', '**/*.php'], { base: "."}),
      gulp.dest(outDir),
      livereload()
    ],
    callback
  );

});

gulp.task('watch', function() {
  livereload({ start: true });
  livereload.listen();
  gulp.watch('src/scss/**/*.scss', ['compress-css']);
  gulp.watch('src/js/**/*.js', ['compress-js'] );
  gulp.watch('src/images/**/*', ['compress-images']);
  gulp.watch('src/html/**/*.html', ['copy-html']);
  gulp.watch('src/fonts/**/*.*', ['fonts']);
});
