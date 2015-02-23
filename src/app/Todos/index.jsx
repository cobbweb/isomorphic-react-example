var React     = require('react');
var TodoList  = require('./TodoList');
var AddTodo   = require('./AddTodo');
var TodoStore = require('./TodoStore');
var Resolver  = require('react-resolver');


var Todos = React.createClass({

  mixins: [Resolver.mixin],

  statics: {
    resolve: {
      todos() {
        return TodoStore.getState().loaded;
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
    var todos = this.state.todos;
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