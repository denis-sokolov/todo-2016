/* eslint no-console: 0 */

'use strict';

const server = require('../server');
const makeBundle = require('./makeBundle');

const PORT = process.env.PORT || 8000;

server({
  makeBundle: makeBundle()
}).listen(PORT, function(){
  console.log('Open http://localhost:' + PORT + '/ in your browser.')
})
