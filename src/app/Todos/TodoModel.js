const TodoActions = require('./TodoActions');
const PouchDB     = require('pouchdb');
const config      = require('../../config/databases').todos;
const { OrderedSet } = require('immutable');


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
    console.log(info);
  }

  initializeData(response) {
    let docs = response.rows.map(row => row.doc);
    this.docs = OrderedSet(docs);
    TodoActions.setState(this.docs);
  }

  insert(doc) {
    doc.createdAt = String(Date.now());
    doc._id = doc.text.substring(0, 16) + '_' + doc.createdAt;
    this.db.post(doc);
  }

  remove(doc) {
    this.db.remove(doc);
  }

}

module.exports = new TodoModel();