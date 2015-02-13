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