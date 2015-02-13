var React = require('react');

module.exports = React.createClass({

  render() {
    var todos = this.props.todos;
    return (
      <ul className="todo-list">
        {todos.map((todo, key) => <li key={key}>{todo.text}</li>)}
      </ul>
    );
  }

});