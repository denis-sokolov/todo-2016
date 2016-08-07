const React = require('react');

const styles = require('./styles.css');

const h = React.createElement.bind(React)

module.exports = function(props){
  const item = props.item;
  return h('li', {
    className: styles.row
  },
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
}
