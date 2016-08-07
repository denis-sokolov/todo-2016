/* eslint no-console: 0 */

'use strict';

const browserify = require('browserify');

const server = require('./server');

const PORT = process.env.PORT || 8000;

var b = browserify(__dirname + '/front/index.js', {
  debug: true
});

server({
  makeBundle: cb => b.bundle(cb)
}).listen(PORT, function(){
  console.log('Open http://localhost:' + PORT + '/ in your browser.')
})
