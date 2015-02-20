'use strict';

var express = require('express');
var mongoose = require('mongoose');
var unitsRoutes = require('./routes/units_routes');

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/unitsapp_development');

var app = express();
var router = express.Router();

unitsRoutes(router);

app.use('/api/v1', router);

app.listen(process.env.PORT || 3000, function() {
  console.log('server listening on port ' + (process.env.PORT || 3000));
});
