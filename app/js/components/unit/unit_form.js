'use strict';

var React = require('react');
var Fluxxor = require('fluxxor');
var actions = require('./../../dispatcher.js');

var FluxMixin = Fluxxor.FluxMixin(React);

var UnitForm = React.createClass({
  mixins: [FluxMixin],
  getInitialState: function() {
    return {newUnit: {unitType: '', unitAttack: '', unitHP: ''}};
  },
  handleChange: function(event) {
    event.preventDefault();

    var name = event.target.name;
    var value = event.target.value;
    var stateCopy = this.state;

    if(name === 'new-unit-type') {
      stateCopy.newUnit.unitType = value;
    } else if(name === 'new-unit-attack') {
      stateCopy.newUnit.unitAttack = value;
    } else if(name === 'new-unit-hp') {
      stateCopy.newUnit.unitHP = value;
    }

    this.setState(stateCopy);
  },
  handleSubmit: function(event) {
    event.preventDefault();

    this.getFlux().actions.addUnit(this.state.newUnit);
    this.setState({newUnit: {unitType: '', unitAttack: '', unitHP: ''}});
  },
  render: function() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="new-unit-type">New Unit Type</label>
        <input id="new-unit-type" type="text" value={this.state.newUnit.unitType} onChange={this.handleChange} name="new-unit-type"/>
        <br/>
        <label htmlFor="new-unit-attack">New Unit Attack</label>
        <input id="new-unit-attack" type="text" value={this.state.newUnit.unitAttack} onChange={this.handleChange} name="new-unit-attack"/>
        <br/>
        <label htmlFor="new-unit-hp">New Unit HP</label>
        <input id="new-unit-hp" type="text" value={this.state.newUnit.unitHP} onChange={this.handleChange} name="new-unit-hp"/>
        <br/>
        <button type="submit">Create New Unit</button>
      </form>
    )
  }
});

module.exports = UnitForm;