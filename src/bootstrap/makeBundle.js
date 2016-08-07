'use strict';

const browserify = require('browserify');
const cssModulesify = require('css-modulesify');
const streamToString = require('stream-to-string');

const crash = function(err){ setTimeout(function(){
  throw err
}); }

module.exports = function(){
  const b = browserify(__dirname + '/../front/index.js', {
    debug: true,
    plugin: [cssModulesify]
  });

  // Latest bundle of CSS is stored here
  // Might be null!
  let css;

  b.on('css stream', function(cssStream){
    streamToString(cssStream, function(err, output){
      if (err) crash(err);
      css = output;
    })
  })

  return function(cb){
    css = null;
    b.bundle(function(err, jsbuff){
      if (err) return cb(err);
      if (!css) crash(new Error('Race condition'))
      cb(null,
        'document.head.appendChild((function(){' + [
          'var s = document.createElement("style")',
          's.innerText = ' + JSON.stringify(css),
          'return s'
        ].join(';') + '})());' + jsbuff.toString()
      )
    })
  }
}
