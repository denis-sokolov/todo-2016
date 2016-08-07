const React = require('react');

const h = React.createElement.bind(React)

module.exports = function(props){
  if (!props.onAdd) throw new Error('onAdd required')

  let input;

  const addFormSubmit = function(event){
    event.preventDefault();
    if (!input.value) return;
    props.onAdd(input.value);
    input.value = '';
    input.focus();
  }

  return h('form', { onSubmit: addFormSubmit },
    h('input', { ref: (inp) => input = inp }),
    h('button', {}, 'Add')
  )
}
