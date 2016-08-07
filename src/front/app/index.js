const React = require('react');

const Add = require('./add');

const styles = require('./styles.css');

const h = React.createElement.bind(React)

module.exports = function(props){
  if (!props.onAdd || !props.items) throw new Error('setup required props')

  const items = props.items.slice(0)
  items.sort((a, b) => (a.created - b.created));

  return h('div', { className: styles.app },
    h('h1', {}, 'My todo'),
    h('ul', { className: styles.list },
      items.map(item =>
        h('li', { key: item.key, className: styles.row },
          h('label', {},
            h('input', {
              type: 'checkbox',
              checked: item.completed,
              className: styles.checkmark,
              onChange: item.completed
                ? () => props.onUncomplete(item.key)
                : () => props.onComplete(item.key)
            }),
            h('span', {}, item.title)
          )
        )
      )
    ),
    h(Add, { onAdd: props.onAdd })
  );
}
