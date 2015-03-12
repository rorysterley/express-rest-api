'use strict';

process.env.MONGO_URI = 'mongodb://localhost/unitsapp_test';
require('../../server');

var mongoose = require('mongoose');
var chai = require('chai');
var chaihttp = require('chai-http');

chai.use(chaihttp);

var expect = chai.expect;

describe('units api end points', function() {
  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });

  it('should respond to a post request', function(done) {
    chai.request('localhost:3000/api/v1')
    .post('/units')
    .send({unitType: "giraffe", unitAttack: "Strobe Lights", unitHP: "165"})
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.body).to.have.property('_id');
      expect(res.body.unitType).to.eql('giraffe');
      expect(res.body.unitAttack).to.eql('Strobe Lights');
      expect(res.body.unitSpeed).to.eql('1');
      done();
    });
  });
});

describe('already have data in database', function() {
  var id;

  beforeEach(function(done) {
    chai.request('localhost:3000/api/v1')
    .post('/units')
    .send({unitType: 'Kakarot', unitAttack: 'Over 9000!', unitHP: '1500'})
    .end(function(err, res) {
      id = res.body._id;
      done();
    });
  });

  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });

  it('should have an index', function(done) {
    chai.request('localhost:3000/api/v1')
    .get('/units')
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(Array.isArray(res.body)).to.be.true; // jshint ignore:line
      expect(res.body[0]).to.have.property('unitType');
      done();
    });
  });

  it('should be able to update a unit', function(done) {
    chai.request('localhost:3000/api/v1')
    .put('/units/' + id)
    .send({unitType: 'GlerpGlorp', unitAttack: 'Bore to death', unitHP: '1'})
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.body.unitType).to.eql('GlerpGlorp');
      expect(res.body.unitAttack).to.eql('Bore to death');
      expect(res.body.unitHP).to.eql('1');
      done();
    });
  });

  it('should delete an entry from the database', function(done) {
    chai.request('localhost:3000/api/v1')
    .del('/units/' + id)
    .end(function(err, res) {
      expect(err).to.eql(null);
      done();
    });
  });
});
