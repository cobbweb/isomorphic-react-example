var React = require('react');
var TodoActions = require('./TodoActions');

var TodoItem = React.createClass({

  delete() {
    TodoActions.remove(this.props.todo._id);
  },

  render() {
    var todo = this.props.todo;
    return <li key={todo._id}>{todo.text} <button onClick={this.delete}>&times;</button></li>
  }

});

module.exports = TodoItem;