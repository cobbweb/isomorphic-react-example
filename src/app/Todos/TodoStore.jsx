var alt = require('../alt');
var TodoActions = require('./TodoActions');
var TodoModel   = require('./TodoModel');

class TodoStore {

  constructor() {
    this.bindActions(TodoActions);
    this.todos = {};
  }

  onCreate(text) {
    TodoModel.insert({ text: text });
  }

  onRemove(todo) {
    TodoModel.remove(todo);
  }

  setState(todos) {
    this.todos = todos;

  }

  static loaded() {
    return TodoModel.loaded;
  }

}

module.exports = alt.createStore(TodoStore);