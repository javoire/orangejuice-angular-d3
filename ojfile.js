#!/usr/bin/env node

var oj = require('orangejuice'),
    html2js = require('gulp-html2js'),
    livereload = require('orangejuice-livereload');

livereload(oj);

oj.sourcePath = 'source';
oj.buildPath = 'build';

oj.preProcessor('ngt', function() {
  return html2js({
    base: 'source'
  })
});

livereload = require('express-livereload');
