'use strict';

var express = require('express');
var mongoose = require('mongoose');
var unitsRoutes = require('./routes/units_routes');
var passport = require('passport');

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/unitsapp_development');

var app = express();
app.set('appSecret', process.env.SECRET || 'process.env.SECRET not set! FIX!');
app.use(passport.initialize());
require('./lib/passport_strat')(passport);

var unitsRouter = express.Router();
var userRouter = express.Router();

unitsRoutes(unitsRouter, app.get('appSecret'));
require('./routes/user_routes')(userRouter, passport, app.get('appSecret'));

app.use('/api/v1', unitsRouter);
app.use('/api/v1', userRouter);


app.listen(process.env.PORT || 3000, function() {
  console.log('server listening on port ' + (process.env.PORT || 3000));
});
