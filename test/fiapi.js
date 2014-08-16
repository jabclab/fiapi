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
});
