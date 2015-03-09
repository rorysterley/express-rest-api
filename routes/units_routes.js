'use strict';
var Unit = require('../models/Unit');
var bodyparser = require('body-parser');

module.exports = function(app) {
  app.use(bodyparser.json());

  app.get('/units', function(req, res) {
    Unit.find({}, function(err, data) {
      if(err) return res.status(500).send({'msg': 'could not retrieve unit'});

      res.json(data);
    });
  });

  app.post('/units', function(req, res) {
    var newUnit = new Unit(req.body);
    newUnit.save(function(err, unit) {
      if(err) return res.status(500).send({'msg': 'could not save unit'});

      res.json(unit);
    });
  });

  app.put('/units/:id', function(req, res) {
    var updatedUnit = req.body;
    delete updatedUnit._id;
    Unit.update({_id: req.params.id}, updatedUnit, function(err, unit) {
      if(err) return res.status(500).send({'msg': 'could not update unit'});

      res.json(req.body);
    });
  });

  app.delete('/units/:id', function(req, res) {
    Unit.remove({_id: req.params.id}, function(err) {
      if (err) return res.status(500).send({'msg': 'could not delete'});

      res.json({'msg': 'success!'});
    });
  });
};
