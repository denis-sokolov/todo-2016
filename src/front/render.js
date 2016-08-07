const React = require('react');
const ReactDOM = require('react-dom');

const App = require('./app');

module.exports = function(opts){
  ReactDOM.render(
    React.createElement(App, opts),
    window.document.getElementById('app'))
}
