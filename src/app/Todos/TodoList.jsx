var React = require('react');
var _     = require('lodash');

var TodoList = React.createClass({

  render() {
    var todos = this.props.todos;
    return (
      <ul className="todo-list">
        {_.map(todos, (todo, key) => {
          return <li key={key}>{todo.text}</li>;
        })}
      </ul>
    );
  }

});

module.exports = TodoList;
