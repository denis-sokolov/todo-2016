const React = require('react');

const Add = require('./add');

const styles = require('./styles.css');

const h = React.createElement.bind(React)

module.exports = function(props){
  if (!props.onAdd || !props.items) throw new Error('setup required props')

  return h('div', { className: styles.app },
    h('h1', {}, 'My todo'),
    h('ul', { className: styles.list },
      props.items.map(item =>
        h('li', { key: item.key, className: styles.row },
          h('label', {},
            h('input', { type: 'checkbox', className: styles.checkmark }),
            h('span', {}, item.title)
          )
        )
      )
    ),
    h(Add, { onAdd: props.onAdd })
  );
}
