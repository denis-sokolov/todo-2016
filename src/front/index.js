const PouchDB = require('pouchdb');

const dbModel = require('./dbModel');
const pureRender = require('./render');

const LIST_KEY = document.location.pathname.slice(1)

const db = new PouchDB(LIST_KEY);

const error = function(err, msg){
  /* eslint no-console: 0 */
  if (msg) console.error(msg, err)
  else console.error(err);
};

const render = function(items){
  pureRender({
    items: items,
    onAdd: (title) => { db.put(dbModel.create(title)) }
  })
}

const refresh = function(){
  db.allDocs({ include_docs: true }, function(err, result){
    render(result.rows.map(row => dbModel.docToObject(row.doc)))
  });
};

db.changes({ live: true, since: 'now' })
  .on('change', refresh)
  .on('error', error)

PouchDB.sync(db, document.location.origin + '/db/' + LIST_KEY)
  .on('complete', function(){
    db.info(function(err, result){
      if (err) return error(err);

      // If the database has not just been created, render:
      if (result.update_seq !== 0) return refresh();

      // Otherwise fill in some dummy data:
      db.put(dbModel.create('Clean up the house'))
        .then(() => db.put(dbModel.create('Find the keys')))
        .catch(error)
    })
  })
  .on('error', error)
