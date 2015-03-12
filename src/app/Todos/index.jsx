// Libs
const React      = require('react');
const Resolver   = require('react-resolver');
const { Paper }  = require('material-ui');

// App
const Atom        = require('../Atom');
const AddTodo     = require('./AddTodo');
const TodoList    = require('./TodoList');
const TodoService = require('./TodoService');

require('./Todos.less');


const Todos = React.createClass({

  // mixins: [Resolver.mixin],

  // statics: {
  //   resolve: {
  //     todos() {
  //       return TodoService.loaded();
  //     }
  //   }
  // },

  removeAll() {
    TodoService.removeAll();
  },

  componentDidMount() {
    Atom.onChange(this.render.bind(this));
  },

  componentWillUnmount() {
    Atom.offChange(this.render.bind(this));
  },

  shouldComponentUpdate: function() {
    console.log('test');
    return true;
  },

  render() {
    const todos = Atom.getState().getIn(['data', 'todos']);
    console.log('renda', todos);
    return <TodoList todos={todos} />;
    // return (
    //   <Paper zDepth={3} className="todos">
    //     <h1 className="mui-font-style-title">Todos!</h1>
    //     <button onClick={this.removeAll}>Remove All</button>
    //     <TodoList todos={todos} />
    //     <AddTodo />
    //   </Paper>
    // );
  }

});

module.exports = Todos;