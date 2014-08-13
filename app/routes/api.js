'use strict';

var db = require('../db');

// ## Module Dependencies
module.exports = function (server) {
  server.get('/api/example', function (req, res) {
    
    var query = db.limit(10);

    // The 'value' event is used to read a static snapshot of the contents at a given path.
    // It is triggered once with the initial data and again every time the data changes.
    query.on('value', function (snapshot) {
      res.json(snapshot.val());
    });

    // The 'child_added' event is typically used when retrieving a list of items in Firebase.
    // child_added is triggered once for each existing child and then again every time a new child is added
    // query.on('child_added', function (snapshot) {
    //   res.json(snapshot.val());
    // });
  });

  server.get('/api/example/:id', function (req, res) {
    res.json({
      id: req.params.id,
      query: req.query
    });
  });

  server.post('/api/example', function (req, res) {
    db.set({
      title: req.body.title || 'Hello World',
      author: req.body.author || 'Firebase',
      location: {
        city: 'San Francisco',
        state: 'California',
        zip: 94103
      }
    }, function (err) {
      res.json(err);
    });
  });
};