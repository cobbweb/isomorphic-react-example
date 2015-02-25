var React = require('react');
var TodoItem = require('./TodoItem');

var TodoList = React.createClass({

  render() {
    var todos = this.props.todos;
    return (
      <ul className="todo-list">
        {todos.toArray().map(todo => {
          return <TodoItem key={todo._id} todo={todo} />;
        })}
      </ul>
    );
  }

});

module.exports = TodoList;
