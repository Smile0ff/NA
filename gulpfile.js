var gulp = require("gulp"),
	cfg = require("./config"),
	
	rename = require("gulp-rename"),
	notify = require("gulp-notify"),
	order = require("gulp-order"),

	less = require("gulp-less"),
	autoprefixer = require("gulp-autoprefixer"),
	minifyCSS = require("gulp-minify-css"),
	concatCSS = require("gulp-concat-css"),

	imagemin = require("gulp-imagemin"),
	pngquant = require("imagemin-pngquant");

gulp.task("js", function(){
	gulp.src(cfg.jsPath + "**/*.js")
		.pipe(gulp.dest(cfg.buildPath + "js"))
		.pipe(notify({message: "js bundled", onLast: true}));
});

gulp.task("copyFA", function(){
	gulp.src("node_modules/font-awesome/less/**.less")
		.pipe(gulp.dest(cfg.cssPath + "/font-awesome"));
});

gulp.task("css", function(){
	
	var fileList = ["home.less"],
		nameExtractor = /[A-Za-z]+(?=\.less)/,
		tasks, match, fileName;

	tasks = fileList.map(function(entry){
		
		match = entry.match(nameExtractor);
		if(!match) return;
		fileName = match[0];

		return gulp.src([
				cfg.cssPath + "reset.less",
				cfg.cssPath + "common.less",
				cfg.cssPath + fileName + ".less"
			])
			.pipe(less())
			.pipe(concatCSS(fileName + ".bundle.css"))
			.pipe(autoprefixer({
				configbrowsers: ["last 4 versions"],
				cascade: true,
				remove: true,
				add: true
			}))
			.pipe(minifyCSS({processImport: false}))
			.pipe(rename({extname: ".min.css"}))
			.pipe(gulp.dest(cfg.buildPath + "css"))
			.pipe(notify({message: "css bundled", onLast: true}));
	});
});

gulp.task("fonts", function(){
	gulp.src("node_modules/font-awesome/fonts/**.*")
		.pipe(gulp.dest(cfg.buildPath + "fonts"));
});

gulp.task("images", function(){

	gulp.src(cfg.imagePath + "**/*.*")
		.pipe(imagemin({
			optimizationLevel: 4,
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [ pngquant() ]
		}))
		.pipe(gulp.dest(cfg.buildPath + "images"));
});

gulp.task("watcher", function(){
	gulp.watch(cfg.jsPath + "**/*.js", ["js"]);
	gulp.watch(cfg.cssPath + "**/*.less", ["css"]);
	gulp.watch(cfg.imagePath + "**/*.*", ["images"]);
});

gulp.task("default", ["js", "copyFA", "css", "fonts", "images", "watcher"]);
