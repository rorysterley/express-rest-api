'use strict';

var Unit = require('../models/Unit');
var eat_auth = require('../lib/eat_auth');
var bodyparser = require('body-parser');

module.exports = function(app, appSecret) {
  app.use(bodyparser.json());

  app.get('/units', eat_auth(appSecret), function(req, res) {
    Unit.find({user_id: req.user._id}, function(err, data) {
      if(err) return res.status(500).send({'msg': 'could not retrieve unit'});

      res.json(data);
    });
  });

  app.post('/units', eat_auth(appSecret), function(req, res) {
    var newUnit = new Unit(req.body);
    newUnit.save(function(err, unit) {
      if(err) return res.status(500).send({'msg': 'could not save unit'});

      res.json(unit);
    });
  });

  app.put('/units/:id', eat_auth(appSecret), function(req, res) {
    var updatedUnit = req.body;
    delete updatedUnit._id;
    Unit.update({_id: req.params.id}, updatedUnit, function(err, unit) {
      if(err) return res.status(500).send({'msg': 'could not update unit'});

      res.json(req.body);
    });
  });

  app.delete('/units/:id', eat_auth(appSecret), function(req, res) {
    Unit.remove({_id: req.params.id}, function(err, data) {
      if(err) return res.status(500).send({'msg': 'could not delete unit'});

      res.end(res.status(200).send({'msg': 'Unit deleted'}));
    });
  });
};
