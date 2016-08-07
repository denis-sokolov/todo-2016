'use strict';

const express = require('express');
const expressPouchDb = require('express-pouchdb');
const namor = require('namor');

module.exports = function(options){
  if (!options.db) throw new Error('db required');
  if (!options.makeBundle) throw new Error('Need makeBundle option')

  const app = express();

  app.get('/', function(req, res){
    res.redirect(303, '/' + namor.generate({ numLen: 0 }))
  });

  app.get('/bundle.js', function(req, res, next){
    options.makeBundle((err, buff) => {
      if (err) return next(err);
      res.set('Content-Type', 'application/javascript')
      res.send(buff);
    })
  });

  app.use('/db', expressPouchDb(options.db, {
    mode: 'minimumForPouchDB'
  }));

  app.get('/:name', function(req, res){
    res.sendFile(__dirname + '/todo.html');
  });

  return app;
}
