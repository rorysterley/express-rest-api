'use strict';

var expect = chai.expect;  // will need to add chai to jshint globals
var greet = require('../../app/js/greet');

describe('test greet', function() {
  it('should greet the universe', function() {
    expect(greet()).to.eql('hello universe');
  });
});