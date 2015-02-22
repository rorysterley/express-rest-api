'use strict';

process.env.MONGO_URI = 'mongodb://localhost/unitsapp_test';
require('../server');

var mongoose = require('mongoose');
var chai = require('chai');
var chaihttp = require('chai-http');

chai.use(chaihttp);

var expect = chai.expect;

describe('user api end points', function() {
  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });

  it('should respond to a post request', function(done) {
    chai.request('localhost:3000/api/v1')
    .post('/create_user')
    .send({email: "test@example.com", password: "foobar123"})
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.body).to.have.property('eat');
      done();
    });
  });

  it('should respond to a get request', function(done) {
    chai.request('localhost:3000/api/v1')
    .get('/sign_in')
    .send('test@example.com:foobar123')
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.body).to.have.property('eat');
      done();
    });
  });
});
