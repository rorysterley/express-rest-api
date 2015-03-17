'use strict';

var Fluxxor = require('fluxxor');
var request = require('superagent');

var constants = require('./../constants');

var baseUrl = '/api/v1/units';

var UnitStore = Fluxxor.createStore({
  initialize: function() {
    this.units = [];

    this.bindActions(
      constants.ADD_UNIT, this.onNewUnit,
      constants.REMOVE_UNIT, this.onRemoveUnit
    );

    request
      .get(baseUrl)
      .end(function(err, res) {
        if (err) return console.log(err);

        this.units = res.body;
        this.emit('change');
      }.bind(this));
  },

  onNewUnit: function(unit) {
    request
      .post(baseUrl)
      .send(unit)
      .end(function(err, res) {
        if (err) return console.log(err);

        this.units.push(res.body);
        this.emit('change');
      }.bind(this));
  },

  onRemoveUnit: function(unit) {
    request
      .del(baseUrl + '/' + unit._id)
      .end(function(err, res) {
        if (err) return console.log(err);

        this.units.splice(this.units.indexOf(unit), 1);
        this.emit('change');
      }.bind(this));
  },

  getState: function() {
    return {units: this.units};
  }
});

module.exports = UnitStore;