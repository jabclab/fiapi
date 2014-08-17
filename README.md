Φ - fiapi
=====

`fiapi` aims to make managing the internal structure of APIs as easy as possible.

[![Build Status](https://travis-ci.org/jabclab/fiapi.svg)](https://travis-ci.org/jabclab/fiapi)
[![Coverage Status](https://coveralls.io/repos/jabclab/fiapi/badge.png)](https://coveralls.io/r/jabclab/fiapi)

```bash
$ ls lib/
method_a.js method_b.js method_c.js
```

```js
var fiapi = require('fiapi');

fiapi({ root: 'lib/' }, function (err, api) {
  console.log(api);
  // { method_a: [Function], method_b: [Function], method_c: [Function] }
});
```

### Installation
```bash
$ npm install fiapi
```

Firstly [`require`](http://nodejs.org/api/globals.html#globals_require) fiapi and then use as follows:

#### fiapi([opts], callback)

__Arguments__

* `opts` - `Object` containing configuration for the `fiapi` call:
  * `opts.root` - (string, default: `__dirname` of where `fiapi` is being called) Root directory of the API.
  * `opts.recursive` (boolean, default: `false`)  - Whether or not to recurse directories within `opts.root`
  * `opts.pattern` (regex, default: `/.*/`) - Pattern of files to include in the API.
* `callback(err, api)` - A callback `function` which is called when calls to all files in applicable directory have been aggregated into an `api` object or an error occurs.

Note that only files which `export` a `function` will be included in your API :smile:

__Examples__

Given the project structure:
```
|- bin
  |- cli.js
|- lib
  |- my_namespace
    |- method_d.js
    |- method_e.js
  |- api.js
  |- method_a.js
  |- method_b.js
  |- method_c.js
package.json
```

```js
// lib/api.js

fiapi(function (err, api) {
  // { method_a: [Function], method_b: [Function], method_c: [Function] }
});
```

```js
// bin/cli.js

fiapi({ root: '../lib', pattern: /^method/ }, function (err, api) {
  // { method_a: [Function], method_b: [Function], method_c: [Function] }
});
```

```js
// bin/cli.js

fiapi({ root: '../lib', pattern: /^method/, recursive: true }, function (err, api) {
  // {
  //   method_a: [Function],
  //   method_b: [Function],
  //   method_c: [Function],
  //   my_namespace: {
  //     method_d: [Function],
  //     method_e: [Function]
  //   }
  // }
}
```
