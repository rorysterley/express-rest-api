'use strict';

var React = require('react');
var Fluxxor = require('fluxxor');
var actions = require('./../../dispatcher.js');
var Unit = require('./unit');

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

module.exports = UnitList;