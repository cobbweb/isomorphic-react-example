var React = require('react');
var TodoItem = require('./TodoItem');

var TodoList = React.createClass({

  componentWillMount() {
    console.log('willMount');
  },

  shouldComponentUpdate() {
    console.log('shouldUpdate');
    return true;
  },

  render() {
    var todos = this.props.todos;
    console.log('renderlist');
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
