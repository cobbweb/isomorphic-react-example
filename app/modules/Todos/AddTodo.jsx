var React = require('react');
var TodoActions = require('./TodoActions');

module.exports = React.createClass({

  addTodo(event) {
    event.preventDefault();
    var input = this.refs.input.getDOMNode();
    TodoActions.create(input.value);
    input.value = '';
  },

  render() {
    return (
      <form action="/todos/add-todo" method="post" onSubmit={this.addTodo}>
        <input type="text" placeholder="Walk dog" ref="input" />
        <button type="submit">Add</button>
      </form>
    );
  }

});