const gulp 						= require('gulp');
const sass						= require('gulp-sass');
const autoprefixer 	= require('autoprefixer');
const cleanCSS 				= require('gulp-clean-css');
const notify 					= require('gulp-notify');
const connect					= require('gulp-connect');
const sourcemaps			= require('gulp-sourcemaps');

const __distFolder__ = './dist';
const srcFiles = {
	html: './src/fonts/**/*.*',
	sass: './src/**/*.sass',
	scss: './src/**/*.scss',
	fonts: './src/fonts/**/*.*'
};

gulp.task('default', ['html', 'fonts', 'css']);
gulp.task('serve', ['default', 'connect', 'watch']);
gulp.task('build', ['html', 'css', 'cssmin']);



gulp.task('html', function () {
	return gulp.src(srcFiles.html)
		.pipe(gulp.dest(__distFolder__)) //the destination folder
		.pipe(connect.reload());
});

gulp.task('fonts', function() {
	return gulp.src(srcFiles.fonts)
		.pipe(gulp.dest(__distFolder__ + '/fonts'));
});

gulp.task('scss', function () {

	return gulp.src(srcFiles.scss)
		.pipe(sass({
			outputStyle: 'compressed',
			includePaths: require('bourbon').includePaths
		}).on('error', sass.logError))
		.pipe(gulp.dest(__distFolder__))
		.pipe(connect.reload());
});


gulp.task('cssmin', ['scss'], function () {
	return gulp.src('./dist/styles.css')
		.pipe(sourcemaps.init())
		.pipe(cleanCSS())
		.pipe(sourcemaps.write('.'))
		.pipe(autoprefixer({
			browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
		}))
		.pipe(gulp.dest(__distFolder__))
});

gulp.task('watch', function(){
	gulp.watch(srcFiles.html, ['html']);
	gulp.watch(srcFiles.scss, ['css']);
});

gulp.task('connect', function() {
	connect.server({
		root: __distFolder__,
		port: 3000,
		livereload: true
	});
});