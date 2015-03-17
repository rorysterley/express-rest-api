'use strict';

var constants = require('./constants');

var actions = {
  addUnit: function(unit) {
    this.dispatch(constants.ADD_UNIT, unit);
  },

  deleteUnit: function(unit) {
    this.dispatch(constants.REMOVE_UNIT, unit);
  }
};

module.exports = actions;