const TodoActions = require('./TodoActions');
const PouchDB     = require('pouchdb');
const config      = require('../../config/databases').todos;

class TodoModel {

  constructor() {
    this.db = new PouchDB(config.database);

    if (config.replicateTo) {
      this.sync = PouchDB.sync(config.database, config.replicateTo, { live: true });
      this.sync.on('change', (info) => {
        if (info.direction === 'pull' && info.change.docs.length > 0) {
          this.refresh();
        }
      });
    }

    var n = Date.now();
    this.loaded = this.db.allDocs({ include_docs: true }).then((response) => {
      this.handleResponse(response);
    });
  }

  refresh() {
    this.db.allDocs({ include_docs: true }).then(this.handleResponse.bind(this));
  }

  handleResponse(response) {
    this.docs = {};
    response.rows.forEach((row) => this.docs[row.id] = row.doc);
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