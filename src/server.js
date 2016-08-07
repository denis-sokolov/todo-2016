'use strict';

const express = require('express');
const namor = require('namor');

const app = express();

app.get('/', function(req, res){
  res.redirect(303, '/' + namor.generate({ numLen: 0 }))
});

app.get('/:name', function(req, res){
  res.send('Looking at list for ' + req.params.name)
});

module.exports = app;
