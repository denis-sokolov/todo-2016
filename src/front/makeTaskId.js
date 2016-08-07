const uuid = require('uuid');

module.exports = function(){
  return 'todo-' + uuid();
}
