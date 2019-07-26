const gulp = require('gulp');
const sass = require('gulp-sass');

gulp.task('default', () => {
   
});

gulp.task('sass', () => {

return gulp.src('./sass/*.scss').pipe(sass()).pipe(gulp.dest('./wwwroot/css'));

});