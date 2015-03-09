'use strict';

var expect = chai.expect;  // jshint ignore:line
var greet = require('../../app/js/greet');

describe('test greet', function() {
  it('should greet the universe', function() {
    expect(greet()).to.eql('hello universe');
  });
});