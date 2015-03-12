// Browser entry point
require('react-tap-event-plugin')();

var React    = require('react/addons');
var Router   = require('react-router');
var resolver = require('react-resolver').create();
var routes   = resolver.route(require('./routes'));

var appContainer = document.getElementById('app');

React.render(<div>Loading</div>, appContainer);

Router.run(routes, Router.HistoryLocation, (Handler) => {
  resolver.resolve(<Handler />).then(function() {
    React.render(<Handler />, appContainer);
  });
});
