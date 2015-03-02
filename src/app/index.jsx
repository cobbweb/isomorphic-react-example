// Browser entry point
require("react-tap-event-plugin")();

var React    = require('react');
var Router   = require('react-router');
var resolver = require('react-resolver').create();
var routes   = resolver.route(require('./routes'));


var appContainer = document.getElementById('app');

React.render(<div>Loading</div>, appContainer);

Router.run(routes, Router.HistoryLocation, (Handler) => {
  resolver.handle(Handler).then((resolved) => {
    React.render(<Handler />, appContainer);
  });
});