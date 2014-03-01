#!/usr/bin/env node

var oj = require('orangejuice'),
    livereload = require('orangejuice-livereload'),
    html2js = require('gulp-html2js');

livereload(oj);

oj.sourcePath = 'source';
oj.buildPath = 'build';

oj.preProcessor('ngt', function() {
  return html2js({
    base: 'source'
  })
});