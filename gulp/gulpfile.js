import pkg  from 'gulp';
const { src, dest } = pkg;
import uglify  from 'gulp-uglify';

import pug from'gulp-pug';

exports.views = () => {
  return src('./src/*.pug')
    .pipe(
      pug({
        // Your options in here.
      })
    )
    .pipe(dest('./dist'));
};

function defaultTask() {
    return src('./public/*.js')
        uglify()
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(dest('dist'))
}

export default defaultTask;