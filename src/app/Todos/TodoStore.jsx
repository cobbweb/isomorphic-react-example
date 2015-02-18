var alt = require('../alt');
var TodoActions = require('./TodoActions');
var PouchDB = require('pouchdb/dist/pouchdb.js');

var db = new PouchDB('todos');
var sync = PouchDB.sync('todos', 'http://localhost:5984/todos', { live: true });

class TodoStore {

  constructor() {
    this.bindActions(TodoActions);
    this.todos = {};

    this.refresh();
    sync.on('change', this.refresh.bind(this));
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

}

module.exports = alt.createStore(TodoStore);
