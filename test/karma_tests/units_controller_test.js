'use strict';

require('../../app/js/client');
require('angular-mocks');

describe('units controller', function() {
  var $ControllerConstructor;
  var $httpBackend;
  var $scope;

  beforeEach(angular.mock.module('unitsApp'));

  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    $scope = $rootScope.$new();
    $ControllerConstructor = $controller;
  }));

  it('should be able to create a controller', function() {
    var unitsController = $ControllerConstructor('unitsController', {$scope: $scope});
    expect(typeof unitsController).toBe('object');
    expect(Array.isArray($scope.units)).toBe(true);
  });

  describe('REST request', function() {
    beforeEach(angular.mock.inject(function(_$httpBackend_) {
      $httpBackend = _$httpBackend_;
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should have an index function', function() {
      $httpBackend.expectGET('/api/v1/units').respond(200, [{unitType: 'test unit'}]);

      var unitsController = $ControllerConstructor('unitsController', {$scope: $scope});
      $scope.getAll();
      $httpBackend.flush();

      expect($scope.units[0].unitType).toBe('test unit');
    });

    it('should be able to save', function() {
      $httpBackend.expectPOST('/api/v1/units').respond(200, {_id: 1, unitType: 'test unit'});

      var unitsController = $ControllerConstructor('unitsController', {$scope: $scope});
      $scope.create({unitType: 'test unit'});
      $httpBackend.flush();

      expect($scope.units[0]._id).toBe(1);
    });

    it('should be able save unit changes', function() {
      $httpBackend.expectPUT('/api/v1/units/1').respond(200);

      var unitsController = $ControllerConstructor('unitsController', {$scope: $scope});
      var unit = {unitType: 'test unit', _id: 1, editing: true};
      $scope.save(unit);
      $httpBackend.flush();

      expect(unit.editing).toBe(false);
    });

    it('should be able to delete a unit', function() {
      $httpBackend.expectDELETE('/api/v1/units/1').respond(200);

      $ControllerConstructor('unitsController', {$scope: $scope});
      var unit = {unitType: 'test unit', _id: 1, editing: true};
      $scope.units.push(unit);
      $scope.remove(unit);
      $httpBackend.flush();

      expect($scope.units.length).toBe(0);
    });
  });
});