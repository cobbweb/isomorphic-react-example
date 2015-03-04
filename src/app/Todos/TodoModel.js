const TodoActions = require('./TodoActions');
const PouchDB     = require('pouchdb');
const config      = require('../../config/databases').todos;
const state       = require('../state');
const Cursor      = require('immutable/contrib/cursor');
const { List }    = require('immutable');
const sortedIndex = require('lodash/array/sortedIndex');


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
      // Do delete operation
      const doc = this.docs.find(doc => doc._id === info.id);

      // Doc gets optimisitcally deleted from the remove event
      if (doc) {
        this.docs = this.docs.delete(this.docs.indexOf(doc));
      }
    } else {
      // Insert or update event
      const index = sortedIndex(this.docs.toArray(), info.doc, (doc) => doc._id);
      this.docs = this.docs.splice(index, 0, info.doc);
    }

    TodoActions.setState(this.docs);
  }

  initializeData(response) {
    let docs = response.rows.map(row => row.doc);
    this.docs = Cursor.from(state.getState(), ['data', 'todos'], newData => state.setState(newData));
    
    TodoActions.setState(this.docs);
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

}

module.exports = new TodoModel();
