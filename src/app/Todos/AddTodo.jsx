var React = require('react');
var TodoActions = require('./TodoActions');

var AddTodo = React.createClass({

  addTodo(event) {
    event.preventDefault();
    var input = this.refs.input.getDOMNode();
    
    if (!input.value) {
      return;
    }

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

module.exports = AddTodo;