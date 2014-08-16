var sinon = require('sinon');
var chai = require('chai');
var sinonChai = require('sinon-chai');

chai.use(sinonChai);

global.expect = chai.expect;

beforeEach(function () {
  global.sandbox = sinon.sandbox.create();
});

afterEach(function () {
  global.sandbox.restore();
});
