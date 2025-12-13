const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const browserSync = require('browser-sync').create();

// Paths
const paths = {
  styles: {
    src: 'src/scss/**/*.scss',
    dest: 'dist/css'
  },
  scripts: {
    src: 'src/js/**/*.js',
    dest: 'dist/js'
  },
  html: {
    src: 'src/**/*.html',
    dest: 'dist'
  },
  assets: {
    src: 'src/assets/**/*',
    dest: 'dist/assets'
  }
};

// Compile Sass
function styles() {
  return gulp.src(paths.styles.src)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      cascade: false
    }))
    .pipe(cleanCSS())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(browserSync.stream());
}

// Compile JavaScript
function scripts() {
  return gulp.src(paths.scripts.src)
    .pipe(sourcemaps.init())
    .pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(browserSync.stream());
}

// Copy HTML files
function html() {
  return gulp.src(paths.html.src)
    .pipe(gulp.dest(paths.html.dest))
    .pipe(browserSync.stream());
}

// Copy assets
function assets() {
  return gulp.src(paths.assets.src)
    .pipe(gulp.dest(paths.assets.dest));
}

// Watch files
function watchFiles() {
  gulp.watch(paths.styles.src, styles);
  gulp.watch(paths.scripts.src, scripts);
  gulp.watch(paths.html.src, html);
  gulp.watch(paths.assets.src, assets);
}

// BrowserSync
function serve() {
  browserSync.init({
    server: {
      baseDir: './dist'
    },
    port: 3000
  });
}

// Define complex tasks
const build = gulp.series(gulp.parallel(styles, scripts, html, assets));
const watch = gulp.series(build, gulp.parallel(watchFiles, serve));

// Export tasks
exports.styles = styles;
exports.scripts = scripts;
exports.html = html;
exports.assets = assets;
exports.watch = watch;
exports.serve = serve;
exports.build = build;
exports.default = build;
