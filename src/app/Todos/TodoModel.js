const TodoService = require('./TodoService');
const PouchDB     = require('pouchdb');
const config      = require('../../config/databases').todos;
const Atom       = require('../Atom');
const { List }    = require('immutable');
const sortedIndex = require('lodash/array/sortedIndex');

const TODOS_PATH = ['data', 'todos'];


class TodoModel {

  constructor() {
    this.db = new PouchDB(config.database);

    if (config.replicateTo) {
      this.sync = PouchDB.sync(config.database, config.replicateTo, { live: true });
    }

    this.loaded = this.db.allDocs({ include_docs: true }).then((response) => {
      this.initializeData(response);

      if (this.sync) {
        this.sync.on('change', (info) => {
          if (info.direction === 'pull' && info.change.docs.length > 0) {
            this.updateData(info);
          }
        });
      }

      this.db.changes({ live: true, include_docs: true, since: 'now' }).on('change', this.updateData.bind(this));
    });
  }

  updateData(info) {
    if (info.deleted) {
      this.docs = this.docs.delete(info.id);
    } else {
      // Insert or update event
      this.docs = this.docs.set(info.id, info.doc);
    }

    Atom.setIn(['data', 'todos'], this.docs);
  }

  initializeData(response) {
    this.docs = Atom.getIn(['data', 'todos']);
    this.docs = this.docs.withMutations(map => {
      response.rows.forEach(row => map.set(row.id, row.doc))
    });
    
    Atom.setIn(['data', 'todos'], this.docs);
  }

  insert(doc) {
    doc.createdAt = String(Date.now());
    doc._id = doc.text.substring(0, 16) + '_' + doc.createdAt;
    this.db.put(doc);
  }

  remove(doc) {
    this.db.remove(doc).then((response) => {
      var info = { deleted: true, id: response.id };
      this.updateData(info);
    });
  }

  removeAll() {
    let docs = this.docs.toArray();
    docs.forEach(doc => doc._deleted = true);
    this.db.bulkDocs(docs, (err, response) => {
      console.log(arguments);
    });
  }

}

module.exports = new TodoModel();
