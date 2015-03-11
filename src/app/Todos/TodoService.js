var TodoModel = require('./TodoModel');

class TodoService {

  create(text) {
    TodoModel.insert({ text: text });
  }

  remove(todo) {
    TodoModel.remove(todo);
  }

  removeAll() {
    TodoModel.removeAll();
  }

  loaded() {
    return TodoModel.loaded;
  }

}

module.exports = new TodoService();
