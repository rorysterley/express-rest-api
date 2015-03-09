'use strict';

module.exports = function(app) {
  app.controller('unitsController', ['$scope', '$http', function($scope, $http) {
    $scope.units = [];
    $scope.getAll = function() {
      $http({
        method: 'GET',
        url: '/api/v1/units'
      })
      .success(function(data) {
        $scope.units = data;
      })
      .error(function(data, status) {
        console.log(data);
      });
    };

    $scope.create = function(unit) {
      $http({
        method: 'POST',
        url: '/api/v1/units',
        data: unit
      })
      .success(function(data) {
        $scope.units.push(data);
      })
      .error(function(data) {
        console.log(data);
      });
    };

    $scope.save = function(unit) {
      $http({
        method: 'PUT',
        url: '/api/v1/units/' + unit._id,
        data: unit
      })
      .success(function() {
        unit.editing = false;
      })
      .error(function(data) {
        console.log(data);
      });
    };

    $scope.remove = function(unit) {
      $http({
        method: 'DELETE',
        url: '/api/v1/units/' + unit._id,
      })
      .success(function() {
        $scope.units.splice($scope.units.indexOf(unit), 1);
      })
      .error(function(data) {
        console.log(data);
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
