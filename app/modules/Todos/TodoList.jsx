var React = require('react');
var TodoItem = require('./TodoItem');

var TodoList = React.createClass({

  render() {
    var todos = this.props.todos;
    return (
      <ul className="todo-list">
        {todos.map((todo) => <TodoItem todo={todo} />)}
      </ul>
    );
  }

});

module.exports = TodoList;