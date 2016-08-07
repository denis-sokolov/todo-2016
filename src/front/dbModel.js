const uuid = require('uuid');

const makeId = function(){
  return 'todo-' + uuid();
}

module.exports = {
  create: title => ({
    _id: makeId(),
    title: title
  }),
  docToObject: doc => ({
    key: doc._id,
    title: doc.title
  })
};
