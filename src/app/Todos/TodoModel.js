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
    this.cursor = Atom.getCursor(['data', 'todos']);

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
      this.cursor = this.cursor.delete(info.id);
    } else {
      // Insert or update event
      this.cursor = this.cursor.set(info.id, info.doc);
    }
  }

  initializeData(response) {
    const updated = this.cursor.withMutations(map => {
      response.rows.forEach(row => map.set(row.id, row.doc))
    });

    this.cursor = this.cursor.merge(updated);
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
    let docs = this.cursor.toArray();
    docs.forEach(doc => doc._deleted = true);
    this.db.bulkDocs(docs, (err, response) => {
      console.log(arguments);
    });
  }

}

module.exports = new TodoModel();
