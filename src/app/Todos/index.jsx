// Libs
const React      = require('react');
const Resolver   = require('react-resolver');
const FluxyMixin = require('alt/mixins/FluxyMixin');
const { Paper }  = require('material-ui');
const { PureRenderMixin } = require('react/addons').addons;

// App
const AddTodo     = require('./AddTodo');
const TodoList    = require('./TodoList');
const TodoStore   = require('./TodoStore');
const TodoActions = require('./TodoActions');

require('./Todos.less');


const Todos = React.createClass({

  mixins: [Resolver.mixin, PureRenderMixin, FluxyMixin],

  statics: {
    resolve: {
      todos() {
        return TodoStore.loaded();
      }
    },
    storeListeners: {
      refresh: TodoStore
    }
  },

  getTodos() {
    return TodoStore.getState().todos;
  },

  getInitialState() {
    return { todos: this.getTodos() };
  },

  refresh() {
    this.setState({ todos: this.getTodos() });
  },

  removeAll() {
    TodoActions.removeAll();
  },

  render() {
    const todos = this.state.todos;
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