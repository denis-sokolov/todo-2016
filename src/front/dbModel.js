const uuid = require('uuid');

const makeId = function(){
  return 'todo-' + uuid();
}

module.exports = {
  create: title => ({
    _id: makeId(),
    created: new Date().getTime(),
    title: title
  }),
  docToObject: doc => ({
    created: doc.created,
    key: doc._id,
    title: doc.title
  })
};
