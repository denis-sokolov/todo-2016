const React = require('react');

const Add = require('./add');

const styles = require('./styles.css');

const h = React.createElement.bind(React)

module.exports = function(props){
  if (!props.onAdd || !props.items) throw new Error('setup required props')

  return h('div', { className: styles.app },
    h('h1', {}, 'My todo items:'),
    h('ul', {},
      props.items.map(item =>
        h('li', { key: item.key },
          h('input', { type: 'checkbox' }),
          h('span', {}, item.title)
        )
      )
    ),
    h(Add, { onAdd: props.onAdd })
  );
}
