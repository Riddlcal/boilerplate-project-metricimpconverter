const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {

  // Test for valid input like 10L
  test('Convert a valid input such as 10L: GET request to /api/convert', function(done) {
    chai.request(server)
      .get('/api/convert?input=10L')
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.initNum, 10);
        assert.equal(res.body.initUnit, 'L');
        assert.approximately(res.body.returnNum, 2.64172, 0.1); // L to gal
        assert.equal(res.body.returnUnit, 'gal');
        done();
      });
  });

  // Test for invalid input unit like 32g
  test('Convert an invalid input such as 32g: GET request to /api/convert', function(done) {
    chai.request(server)
      .get('/api/convert?input=32g')
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body, 'invalid unit');
        done();
      });
  });

  // Test for invalid number like 3/7.2/4kg
  test('Convert an invalid number such as 3/7.2/4kg: GET request to /api/convert', function(done) {
    chai.request(server)
      .get('/api/convert?input=3/7.2/4kg')
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body, 'invalid number');
        done();
      });
  });

  // Test for invalid number AND unit like 3/7.2/4kilomegagram
  test('Convert an invalid number AND unit such as 3/7.2/4kilomegagram: GET request to /api/convert', function(done) {
    chai.request(server)
      .get('/api/convert?input=3/7.2/4kilomegagram')
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body, 'invalid number and unit');
        done();
      });
  });

  // Test for valid unit with no number, such as kg
  test('Convert with no number such as kg: GET request to /api/convert', function(done) {
    chai.request(server)
      .get('/api/convert?input=kg')
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.initNum, 1); // Default to 1
        assert.equal(res.body.initUnit, 'kg');
        assert.approximately(res.body.returnNum, 2.20462, 0.1); // kg to lbs
        assert.equal(res.body.returnUnit, 'lbs');
        done();
      });
  });

});
