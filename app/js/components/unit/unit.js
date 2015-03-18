'use strict';

var React = require('react');
var Fluxxor = require('fluxxor');
var actions = require('./../../dispatcher.js');

var FluxMixin = Fluxxor.FluxMixin(React);

var Unit = React.createClass({
  mixins: [FluxMixin],
  handleDelete: function() {
    this.getFlux().actions.deleteUnit(this.props.data);
  },
  render: function() {
    return <li>Unit Type: {this.props.data.unitType}<br/>Unit Attack: {this.props.data.unitAttack}<br/>Unit HP: {this.props.data.unitHP}<br/><button onClick={this.handleDelete}>Delete</button></li>
  }
});

module.exports = Unit;