const React = require('react');

const Add = require('./add');
const Row = require('./row');

const styles = require('./styles.css');

const h = React.createElement.bind(React)

module.exports = function(props){
  if (!props.onAdd || !props.items) throw new Error('setup required props')

  const items = props.items.slice(0)
  items.sort((a, b) => (a.created - b.created));

  return h('div', { className: styles.app },
    h('h1', {}, 'My todo'),
    h('ul', { className: styles.list },
      items.map(item => h(Row, {
        key: item.key,
        item: item,
        onComplete: props.onComplete,
        onUncomplete: props.onUncomplete
      }))
    ),
    h(Add, { onAdd: props.onAdd })
  );
}
