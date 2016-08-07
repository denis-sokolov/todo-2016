const uuid = require('uuid');

const makeId = function(){
  return 'todo-' + uuid();
}

module.exports = {
  create: title => ({
    _id: makeId(),
    completed: false,
    created: new Date().getTime(),
    title: title
  }),
  docToObject: doc => ({
    completed: doc.completed,
    created: doc.created,
    key: doc._id,
    title: doc.title
  }),
  idByKey: key => key
};
