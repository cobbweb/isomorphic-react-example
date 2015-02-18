var React = require('react');
var { Route, DefaultRoute } = require('react-router');

var Application = require('./Application');
var HomePage    = require('./HomePage');
var Todos       = require('./Todos');

module.exports = (
  <Route name="app" path="/" handler={Application}>
    <Route name="todos" handler={Todos} />
    <DefaultRoute handler={HomePage} />
  </Route>
);