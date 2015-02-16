var React = require('react');
var { RouteHandler, Link } = require('react-router');

require('./styles.less');

var Application = React.createClass({

  render() {
    return (
      <div>
        <h1>My App</h1>
        <nav>
          <Link to="app">Home</Link>
          <Link to="todos">About</Link>
        </nav>
        <section>
          <RouteHandler />
        </section>
      </div>
    );
  }

});

module.exports = Application;


var Swarm = require('swarm');
var TodoItem = require('../../server/models/TodoItem');
var TodoList = require('../../server/models/TodoList');

var swarmHost = new Swarm.Host('1232312');
swarmHost.connect('ws://localhost:7001');


var todo = new TodoItem();

todo.set({ text: 'Buy Milk' });


var todos = new TodoList();
todos.insert(todo);
console.log(todo);
console.log(todos);
