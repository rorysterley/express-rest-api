'use strict';

require('angular/angular');

var unitsApp = angular.module('unitsApp', []);

// services
require('./services/resource_service')(unitsApp);

// controllers
require('./units/controllers/units_controller')(unitsApp);

// directives
require('./directives/dummy_directive')(unitsApp);
require('./directives/create_resource_directive')(unitsApp);
require('./units/directives/create_unit_directive_one')(unitsApp);
