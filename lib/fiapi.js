var fs = require('fs');
var extend = require('util')._extend;

module.exports = fiapi;

var defaults = {
  root: __dirname,
  recursive: false,
  pattern: /.*/
};

function fiapi(opts, cb) {
  if (typeof opts === 'function') {
    cb = opts;
    opts = {};
  }

  validateArgs(opts, cb);

  extend(opts, defaults);
}

function validateArgs(opts, cb) {
  if (Object.prototype.toString.call(opts) !== '[object Object]') {
    throw new TypeError('invalid arguments: expected object or function');
  }

  if (typeof cb !== 'function') {
    throw new TypeError('invalid arguments: callback must be passed');
  }
}
