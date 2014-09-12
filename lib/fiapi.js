'use strict';

var extend = require('util')._extend;
var fs = require('fs');
var path = require('path');

exports = module.exports = fiapi;

function fiapi(opts, cb) {
  if (typeof opts === 'function') {
    cb = opts;
    opts = {};
  }

  validateArgs(opts, cb);

  var defaults = {
    root: process.cwd(),
    recursive: false,
    pattern: /.*/
  };

  validateOpts(opts, function (err) {
    if (err) {
      return cb(err);
    }

    return buildApi(extend(defaults, opts), cb);
  });
}

function validateArgs(opts, cb) {
  if (Object.prototype.toString.call(opts) !== '[object Object]') {
    throw new TypeError('invalid arguments: expected object or function');
  }

  if (typeof cb !== 'function') {
    throw new TypeError('invalid arguments: callback must be passed');
  }
}

function validateOpts(opts, cb) {
  var root = opts.root;

  if (root && Object.prototype.toString.call(root) !== '[object String]') {
    return cb(new TypeError('invalid arguments: opts.root must be a string'));
  }

  return cb(null);
}

function buildApi(opts, cb) {
  var absoluteRoot = path.resolve(process.cwd(), opts.root);

  fs.readdir(absoluteRoot, function readdirResults(err, files) {
    var api = {};
    var jsRegex = /\.js$/;

    files.filter(function removeNonJavaScript(file) {
      return jsRegex.test(file);
    }).map(function removeJsExtension(file) {
      return file.replace(jsRegex, '');
    }).filter(function patternFilter(file) {
      return opts.pattern.test(file);
    }).forEach(function (file) {
      api[file] = {};
    });

    return cb(null, api);
  });
}
