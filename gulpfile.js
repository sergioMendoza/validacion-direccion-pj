var gulp = require('gulp'); // npm i gulp -D instalar gulp
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var babel = require('gulp-babel');
var minifycss = require('gulp-minify-css'); //npm i gulp-minify-css -D
var sass = require('gulp-sass'); //npm install gulp-sass -D
var imagemin = require('gulp-imagemin');
// copiando archivos de bootstrap
gulp.task('sass', () => {
    return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss',
            'src/sass/*.scss'
        ])
        .pipe(sass())
        .pipe(concat('main.min.css'))
        .pipe(minifycss())
        .pipe(gulp.dest('public/css'))
})



// copiando archivos de jquery 
gulp.task('js', function() { // instalar  npm i gulp-concat gulp-uglify gulp-babel -D
    return gulp.src('src/js/*.js') // todos los archivos con extension js de la carpeta js
        .pipe(concat('app.min.js')) // 1ero concatena
        .pipe(babel({ presets: ['env'] })) // 2do transpila
        .pipe(uglify()) // minimiza
        .pipe(gulp.dest('public/js/'))
})


gulp.task('images', function () {
    return gulp.src(['src/assets/images/*.*'])
        .pipe(imagemin())
        .pipe(gulp.dest('public/assets/images/'));
  });
  

// una tarea que ejecuta todo
gulp.task('minifica-todo', ['sass', 'js','images'])

// va actualizando ante cualquier cambio
gulp.task('watch', function() {
    gulp.watch(['src/css/*.css', 'src/sass/*.scss'], ['css']);
    gulp.watch('src/js/*.js', ['js']);
})