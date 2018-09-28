var gulp    = require('gulp');
var apidoc  = require('gulp-apidoc');

gulp.task('apidoc', function(done){
  apidoc({
    src: "app/",
    dest: "public/apidoc",
    includeFilters: [ "^((?!node_modules).)*$" ]
  }, done);
});
