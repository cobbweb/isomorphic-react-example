var React = require('react');

var TodoList = React.createClass({

  render() {
    var todos = this.props.todos;
    return (
      <ul className="todo-list">
        {todos.map((todo, key) => <li key={key}>{todo.text}</li>)}
      </ul>
    );
  }

});

module.exports = TodoList;