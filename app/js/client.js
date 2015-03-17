'use strict';

var React = require('react');
var Fluxxor = require('fluxxor');
var UnitStore = require('./stores/unit_store');
var actions = require('./dispatcher.js');
var UnitsApp = require('./components/unit/units_app');

var stores = {
  UnitStore: new UnitStore()
};

var flux = new Fluxxor.Flux(stores, actions);

React.render(<UnitsApp flux={flux}/>, document.body);
