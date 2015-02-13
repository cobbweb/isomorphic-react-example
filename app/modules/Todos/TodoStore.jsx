var alt = require('../alt');
var TodoActions = require('./TodoActions');

class TodoStore {

  constructor() {
    this.bindActions(TodoActions);
    this.todos = [];

    this.onCreate('Buy Milk');
    this.onCreate('Feed Dog');
  }

  onCreate(text) {
    var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
    this.todos.push({ id: id, text: text });
  }

}

module.exports = alt.createStore(TodoStore);