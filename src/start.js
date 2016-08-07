/* eslint no-console: 0 */

'use strict';

const app = require('./server');

const PORT = process.env.PORT || 8000;

app.listen(PORT, function(){
  console.log('Open http://localhost:' + PORT + '/ in your browser.')
})
