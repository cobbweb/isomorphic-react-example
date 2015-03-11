var React = require('react');
var TodoService = require('./TodoService');

var TodoItem = React.createClass({

  render() {
    return (
      <li>
        <span>{this.props.todo.text}</span>
        <button onClick={this.remove}>&times;</button>
      </li>);
  },

  remove() {
    TodoService.remove(this.props.todo);
  }

});

module.exports = TodoItem;