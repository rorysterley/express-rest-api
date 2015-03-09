'use strict';

module.exports = function(app) {
  app.controller('unitsController', ['$scope', 'resource', function($scope, resource) {
    $scope.units = [];

    var Unit = resource('units');

    $scope.getAll = function() {
     Unit.getAll(function(data) {
      $scope.units = data;
     });
    };

    $scope.create = function(unit) {
      Unit.create(unit, function(data) {
        $scope.units.push(data);
      });
    };

    $scope.save = function(unit) {
      Unit.save(unit, function(data) {
        unit.editing = false;
      });
    };

    $scope.remove = function(unit) {
      Unit.remove(unit, function() {
        $scope.units.splice($scope.units.indexOf(unit), 1);
      });
    };

    $scope.editToggle = function(unit) {
      if (unit.editing) {
        unit.unitType = unit.oldUnitType;
        unit.editing = false;
      } else {
        unit.oldUnitType = unit.unitType;
        unit.editing = true;
      }
    };
  }]);
};
