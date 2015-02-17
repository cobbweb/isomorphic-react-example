var alt = require('../alt');
var TodoActions = require('./TodoActions');

alt.backend.subscribe('todos');

var Todos = alt.backend.getCollection('todos');
var TodosQuery = Todos.reactiveQuery({});

class TodoStore {

  constructor() {
    this.bindActions(TodoActions);

    this.todos = TodosQuery.result;

    TodosQuery.on('change', this.refresh.bind(this));
  }

  onCreate(text) {
    if (!this.getInstance()) {
      return true;
    }

    Todos.insert({ text: text });
  }

  onRemove(_id) {
    if (!this.getInstance()) {
      return true;
    }

    Todos.remove(_id);
  }

  refresh() {
    if (!this.getInstance()) {
      return true;
    }

    this.todos = TodosQuery.result;
    this.getInstance().emitChange();
  }

}

module.exports = alt.createStore(TodoStore);