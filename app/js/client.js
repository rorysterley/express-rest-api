'use strict';

var React = require('react');
var ajax = require('jquery').ajax;

var UnitForm = React.createClass({
  getInitialState: function() {
    return {newUnit: {unitType: '', unitAttack: '', unitHP: ''}};
  },
  handleChange: function(event) {
    var id = event.target.id;
    var current = this.state.newUnit;
    var value = event.target.value;

    if(id === 'newunittype') {
      current.unitType = value;
      this.setState({newUnit: current});
    } else
    if(id === 'newunitattack') {
      current.unitAttack = value;
      this.setState({newUnit: current});
    } else
    if(id === 'newunithp') {
      current.unitHP = value;
      this.setState({newUnit: current});
    }
  },
  handleSubmit: function(event) {
    event.preventDefault();
    var newUnit = this.state.newUnit;
    ajax({
      url: this.props.url,
      contentType: 'application/json',
      method: 'POST',
      data: JSON.stringify(newUnit),
      success: function(data) {
        this.props.onNewUnitSubmit(data);
        this.setState({newUnit: {unitType: '', unitAttack: '', unitHP: ''}});
      }.bind(this),
      error: function(xhr, status, err) {
        console.log(err);
      }
    });
  },
  render: function() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="newunittype">New Unit Type</label>
        <input id="newunittype" type="text" value={this.state.newUnit.unitType} onChange={this.handleChange}/>
        <br/>
        <label htmlFor="newunitattack">New Unit Attack</label>
        <input id="newunitattack" type="text" value={this.state.newUnit.unitAttack} onChange={this.handleChange}/>
        <br/>
        <label htmlFor="newunithp">New Unit HP</label>
        <input id="newunithp" type="text" value={this.state.newUnit.unitHP} onChange={this.handleChange}/>
        <br/>
        <button type="submit">Create New Unit</button>
      </form>
    )
  }
});

var Unit = React.createClass({
  render: function() {
    return <li>Unit Type: {this.props.data.unitType}<br/>Unit Attack: {this.props.data.unitAttack}<br/>Unit HP: {this.props.data.unitHP}</li>
  }
});

var UnitList = React.createClass({
  render: function() {
    var units = this.props.data.map(function(unit) {
      return <Unit data={unit} key={unit._id}/>;
    });
    return (
      <section>
        <h1>Units:</h1>
        <ul>
          {units}
        </ul>
      </section>
    )
  }
});

var UnitsApp = React.createClass({
  getInitialState: function() {
    return {unitsData: []};
  },
  onNewUnit: function(unit) {
    unit._id = this.state.unitsData.length + 1;
    var stateCopy = this.state;
    stateCopy.unitsData.push(unit);
    this.setState(stateCopy);
  },
  componentDidMount: function() {
    ajax({
      url: this.props.unitsBaseUrl,
      dataType: 'json',
      success: function(data) {
        var state = this.state;
        state.unitsData = data;
        this.setState(state);
      }.bind(this),
      error: function(xhr, status) {
        console.log(xhr, status);
      }
    });
  },
  render: function() {
    return (
      <main>
        <UnitForm onNewUnitSubmit={this.onNewUnit} url={this.props.unitsBaseUrl}/>
        <UnitList data={this.state.unitsData} />
      </main>
    )
  }
});

React.render(<UnitsApp unitsBaseUrl={'/api/v1/units'}/>, document.body);
