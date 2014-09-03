var path = require('path');
var rewire = require('rewire');

describe('fiapi', function () {
  var fiapi;
  var filepath = path.resolve(__dirname, '../lib/fiapi');

  var readdirStub;

  beforeEach(function () {
    fiapi = rewire(filepath);

    readdirStub = sandbox.stub(fiapi.__get__('fs'), 'readdir');
  });

  it('should export a function', function () {
    expect(require(filepath)).to.be.a('function');
  });

  it('should call callback with TypeError if first arg is specified and is not a function or object', function () {
    expect(fiapi.bind(null, [], function () {})).to.throw(
      TypeError, 'invalid arguments: expected object or function'
    );
  });

  it('should call callback with TypeError if second arg is not a function', function () {
    expect(fiapi.bind(null, {}, {})).to.throw(
      TypeError, 'invalid arguments: callback must be passed'
    );
  });
});
