const TodoActions = require('./TodoActions');
const PouchDB     = require('pouchdb');
const config      = require('../../config/databases').todos;
const { List } = require('immutable');


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

    if (info.deleted) {
      const doc = this.docs.find(doc => doc._id === info.id)
      this.docs = this.docs.delete(doc);
    } else {
      let lastDoc, lastIndex;
      this.docs.forEach((doc, index) => {
        if (info.id > doc._id) {
          lastIndex = index;
        } else {
          this.docs = this.docs.splice(index-1, 0, info.doc);
        }
      });
    }

    TodoActions.setState(this.docs);    
  }

  initializeData(response) {
    let docs = response.rows.map(row => row.doc);
    this.docs = List(docs);
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