#!/usr/bin/env node

var oj = require('orangejuice'),
    html2js = require('gulp-html2js'),
    jshint = require('gulp-jshint'),
    cssPrefix = require('gulp-autoprefixer');

oj.sourcePath = 'source';
oj.buildPath = 'build';

oj.preProcessor('ngt', function() {
  return html2js({
    base: 'source'
  })
});

oj.postProcessor('css', function() {
  return cssPrefix()
});