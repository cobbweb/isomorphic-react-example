var alt = require('../alt');
var TodoActions = require('./TodoActions');
var PouchDB = require('pouchdb');

var db = new PouchDB('http://localhost:5984/todos');
// var sync = PouchDB.sync('todos', , { live: true });

class TodoStore {

  constructor() {
    this.bindActions(TodoActions);
    this.todos = {};

    this.refresh();
    // sync.on('change', this.refresh.bind(this));
    this.loaded = db.allDocs({ include_docs: true });
  }

  onCreate(text) {
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
