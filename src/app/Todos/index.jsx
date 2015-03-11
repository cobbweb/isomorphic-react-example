// Libs
const React      = require('react');
const Resolver   = require('react-resolver');
const { Paper }  = require('material-ui');
const { PureRenderMixin } = require('react/addons').addons;

// App
const Atom        = require('../Atom');
const AddTodo     = require('./AddTodo');
const TodoList    = require('./TodoList');
const TodoService = require('./TodoService');

require('./Todos.less');


const Todos = React.createClass({

  mixins: [Resolver.mixin, PureRenderMixin],

  statics: {
    resolve: {
      todos() {
        return TodoService.loaded();
      }
    }
  },

  getTodos() {
    return Atom.getIn(['data', 'todos']);
  },

  getInitialState() {
    return { todos: this.getTodos() };
  },

  refresh() {
    this.setState({ todos: this.getTodos() });
  },

  removeAll() {
    TodoService.removeAll();
  },

  render() {
    const todos = this.state.todos;
    console.log(todos);
    return (
      <Paper zDepth={3} className="todos">
        <h1 className="mui-font-style-title">Todos</h1>
        <button onClick={this.removeAll}>Remove All</button>
        <TodoList todos={todos} />
        <AddTodo />
      </Paper>
    );
  }

});

module.exports = Todos;