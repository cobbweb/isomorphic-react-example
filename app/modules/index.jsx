// Browser entry point
//
window.Q = require('q');
window.DDP = require('ddp.js');

var React = require('react');
var Router = require('react-router');
var routes = require('./routes');

Router.run(routes, Router.HistoryLocation, (Handler) => {
  React.render(<Handler />, document.getElementById('app'))
});

