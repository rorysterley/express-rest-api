'use strict';

module.exports = function(app) {
  app.directive('createUnitDirective', function() {
    return {
      restrict: 'A',
      templateUrl: '/templates/units/directives/create_unit_directive.html',
      replace: true
    };
  });
};