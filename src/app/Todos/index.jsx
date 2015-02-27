// Libs
const React      = require('react');
const Resolver   = require('react-resolver');
const { PureRenderMixin } = require('react/addons').addons;

// App
const AddTodo    = require('./AddTodo');
const TodoList   = require('./TodoList');
const TodoStore  = require('./TodoStore');

const Todos = React.createClass({

  mixins: [Resolver.mixin, PureRenderMixin],

  statics: {
    resolve: {
      todos() {
        TodoStore.loaded().then(() => console.log('I am resolved'))
        return TodoStore.loaded();
      }
    }
  },

  getInitialState() {
    return { todos: this.getTodos() };
  },

  getTodos() {
    return TodoStore.getState().todos;
  },

  componentDidMount() {
    TodoStore.listen(this.refresh);
  },

  componentWillUnmount() {
    TodoStore.unlisten(this.refresh);
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