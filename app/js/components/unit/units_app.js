'use strict';

var React = require('react');
var Fluxxor = require('fluxxor');
var UnitForm = require('./unit_form');
var UnitList = require('./unit_list');

var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;


var UnitsApp = React.createClass({
  mixins: [FluxMixin, StoreWatchMixin('UnitStore')],

 getStateFromFlux: function() {
  return this.getFlux().store('UnitStore').getState();
 },
  render: function() {
    return (
      <main>
        <UnitForm />
        <UnitList data={this.state.units} />
      </main>
    )
  }
});

module.exports = UnitsApp;