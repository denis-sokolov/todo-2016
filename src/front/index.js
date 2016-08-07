const PouchDB = require('pouchdb');

const pureRender = require('./render');
const makeTaskId = require('./makeTaskId');

const db = new PouchDB('tasks');

const error = function(err, msg){
  /* eslint no-console: 0 */
  if (msg) console.error(msg, err)
  else console.error(err);
};

const render = function(items){
  pureRender({
    items: items,
    onAdd: (title) => {
      db.put({ _id: makeTaskId(), title: title })
    }
  })
}

const refresh = function(){
  db.allDocs({ include_docs: true }, function(err, result){
    render(result.rows.map(row => ({
      key: row.doc._id,
      title: row.doc.title
    })));
  });
};

db.changes({ live: true, since: 'now' })
  .on('change', refresh)
  .on('error', error)

PouchDB.sync(db, document.location.origin + '/db' + document.location.pathname)
  .on('complete', function(){
    db.info(function(err, result){
      if (err) return error(err);

      // If the database has not just been created, render:
      if (result.update_seq !== 0) return refresh();

      // Otherwise fill in some dummy data:
      db.put({ _id: makeTaskId(), title: 'Clean up the house', })
        .then(() => db.put({ _id: makeTaskId(), title: 'Find the keys' }))
        .catch(error)
    })
  })
  .on('error', error)
