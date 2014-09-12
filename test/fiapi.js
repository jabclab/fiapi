var path = require('path');
var rewire = require('rewire');

describe('fiapi', function () {
  this.timeout(100);

  var fiapi;
  var filepath = path.resolve(__dirname, '..', 'lib' , 'fiapi');

  var readdirStub;

  beforeEach(function () {
    fiapi = rewire(filepath);

    readdirStub = sandbox.stub(fiapi.__get__('fs'), 'readdir');
  });

  it('should export a function', function () {
    expect(require(filepath)).to.be.a('function');
  });

  it('should thorw TypeError if first arg is specified and is not a function or object', function () {
    expect(fiapi.bind(null, [], function () {})).to.throw(
      TypeError, 'invalid arguments: expected object or function'
    );
  });

  it('should throw TypeError if second arg is not a function', function () {
    expect(fiapi.bind(null, {}, {})).to.throw(
      TypeError, 'invalid arguments: callback must be passed'
    );
  });

  it('should call callback with no error if executes successfully', function (done) {
    readdirStub.yieldsAsync(null, []);

    fiapi({}, function (err) {
      expect(err).to.be.null;

      done();
    });
  });

  it('should call callback with an object if no matching methods', function (done) {
    readdirStub.yieldsAsync(null, []);

    fiapi({}, function (err, api) {
      expect(api).to.eql({});

      done();
    });
  });

  it('should work on current working directory if no root specified', function (done) {
    readdirStub.yieldsAsync(null, []);
    
    fiapi({}, function () {
      expect(readdirStub).to.have.been.calledWith(process.cwd());

      done();
    });
  });

  it('should support relative directory to current working directory', function (done) {
    var relativePath = '../my_dir';
    var absolutePath = path.resolve(process.cwd(), relativePath);

    readdirStub.yieldsAsync(null, []);
    
    fiapi({ root: relativePath }, function () {
      expect(readdirStub).to.have.been.calledWith(absolutePath);

      done();
    });  
  });

  it('should support absolute root directory', function (done) {
    var absolutePath = '/my/absolute/path';

    readdirStub.yieldsAsync(null, []);
    
    fiapi({ root: absolutePath }, function () {
      expect(readdirStub).to.have.been.calledWith(absolutePath);

      done();
    });
  });

  it('should call callback with TypeError if root is not a string', function (done) {
    var error = new TypeError('invalid arguments: opts.root must be a string');

    fiapi({ root: {} }, function (err) {
      expect(err).to.eql(error);

      done();
    });
  });

  xit('should call callback with an error if absolute root directory does not exist', function () {
    // TODO: should be an error thrown by fs.readdir 
  });

  it('should include all .js files if no pattern is provided', function (done) {
    var absolutePath = '/my/absolute/path';
    var files = ['file_a.js', 'file_b.js', 'file_c.go', 'file_d.py', 'file_e.js'];
    var expectedKeys = ['file_a', 'file_b', 'file_e'];

    readdirStub.withArgs(absolutePath).yieldsAsync(null, files);
    
    fiapi({ root: absolutePath }, function (err, api) {
      expect(Object.keys(api)).to.eql(expectedKeys);

      done();
    });
  });

  it('should not include files which do not match specified pattern', function (done) {
    var absolutePath = '/my/absolute/path';
    var files = ['file_a.js', 'file_b.js', 'file_c_1.js', 'file_c_2.js', 'file_d.js'];
    var expectedKeys = ['file_c_1', 'file_c_2'];

    readdirStub.withArgs(absolutePath).yieldsAsync(null, files);
    
    fiapi({ root: absolutePath, pattern: /c_[1-2]$/ }, function (err, api) {
      expect(Object.keys(api)).to.eql(expectedKeys);

      done();
    });
  });

  it('should ignore non-js files even if match pattern', function () {
  });

  it('should call callback with TypeError if pattern is not a RegEx', function () {
  });

  it('should not include child directories if recursive is not specified', function () {
  });

  it('should not include child directories if recursive is false', function () {
  });

  it('should exclude files which do not export a function', function () {
  });
});
