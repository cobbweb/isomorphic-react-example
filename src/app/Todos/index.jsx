// Libs
const React      = require('react');
const Resolver   = require('react-resolver');
const FluxyMixin = require('alt/mixins/FluxyMixin');
const { PureRenderMixin } = require('react/addons').addons;

// App
const AddTodo    = require('./AddTodo');
const TodoList   = require('./TodoList');
const TodoStore  = require('./TodoStore');

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

  render() {
    const todos = this.state.todos;
    return (
      <div className="todos">
        <h3>Todos</h3>

        <TodoList todos={todos} />
        <AddTodo />
      </div>
    );
  }

});

module.exports = Todos;