'use strict';

var mongoose = require('mongoose');

var unitSchema = new mongoose.Schema({
  unitType: String,
  unitAttack: String,
  unitHP: String,
  unitRange: {type: String, default: '1'},
  unitSpeed: {type: String, default: '1'},
  unitDefence: {type: String, default: '0'},
  unitAbility: {type: String, default: 'none'}
});

module.exports = mongoose.model('Unit', unitSchema);
