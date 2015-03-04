'use strict';

require('angular/angular');

var unitsApp = angular.module('unitsApp', []);

require('./units/controllers/units_controller')(unitsApp);