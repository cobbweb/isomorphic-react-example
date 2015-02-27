var React = require('react');
var TodoActions = require('./TodoActions');

var TodoItem = React.createClass({

  render() {
    return (
      <li>
        <span>{this.props.todo.text}</span>
        <button onClick={this.remove}>&times;</button>
      </li>);
  },

  remove() {
    TodoActions.remove(this.props.todo);
  }

});

module.exports = TodoItem;