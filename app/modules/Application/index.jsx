var React = require('react');
var { RouteHandler, Link } = require('react-router');

var Application = React.createClass({

  render() {
    return (
      <div>
        <h1>My App</h1>
        <nav>
          <Link to="app">Home</Link>
          <Link to="about">About</Link>
        </nav>
        <section>
          <RouteHandler />
        </section>
      </div>
    );
  }

});

module.exports = Application;