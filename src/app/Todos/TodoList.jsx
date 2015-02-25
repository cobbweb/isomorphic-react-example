var React = require('react');
var _     = require('lodash');
var TodoItem = require('./TodoItem');

var TodoList = React.createClass({

  render() {
    var todos = this.props.todos;
    return (
      <ul className="todo-list">
        {_.map(todos, (todo, key) => {
          return <TodoItem key={key} todo={todo} />;
        })}
      </ul>
    );
  }

});

module.exports = TodoList;
