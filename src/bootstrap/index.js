/* eslint no-console: 0 */

'use strict';

const memdown = require('memdown');
const PouchDB = require('pouchdb');

const server = require('../server');
const makeBundle = require('./makeBundle');

const PORT = process.env.PORT || 8000;

const InMemPouchDB = PouchDB.defaults({db: memdown });
InMemPouchDB.setMaxListeners(30);

server({
  db: InMemPouchDB,
  makeBundle: makeBundle()
}).listen(PORT, function(){
  console.log('Open http://localhost:' + PORT + '/ in your browser.')
})
