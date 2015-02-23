var alt = require('../alt');
var TodoActions = require('./TodoActions');
var PouchDB = require('pouchdb');
var config = require('../../config/databases').todos;

var db = new PouchDB(config.database);
var sync;

if (config.replicateTo) {
  sync = PouchDB.sync(config.database, config.replicateTo, { live: true })
}

class TodoStore {

  constructor() {
    this.bindActions(TodoActions);
    this.todos = {};

    this.refresh();

    if (sync) {
      sync.on('change', this.refresh.bind(this));
    }

    this.loaded = db.allDocs({ include_docs: true });
  }

  onCreate(text) {
    console.log('create');
    var doc = { "_id": new Date().toJSON(), text: text };
    db.put(doc).then(this.refresh.bind(this));
  }

  refresh() {
    this.todos = {};
    db.allDocs({ include_docs: true }).then((response) => {
      response.rows.forEach((row) => { this.todos[row.id] = row.doc});
      this.getInstance().emitChange();
    });
  }

  onLoad(cb) {
    this._loaded.then(cb);
  }

}

module.exports = alt.createStore(TodoStore);
