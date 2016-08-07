const React = require('react');
const ReactDOM = require('react-dom');

const App = require('./app');

const items = [
  { title: 'Clean up the house', key: 'preset-1' },
  { title: 'Find keys', key: 'preset-2' },
]

const render = function(){
  ReactDOM.render(
    React.createElement(App, {
      items: items,
      onAdd: title => {
        items.push({ title: title, key: items.length })
        render()
      }
    }),
    window.document.getElementById('app'))
}

render()
