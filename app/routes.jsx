var React = require('react');
var { Route, DefaultRoute } = require('react-router');

var Application = require('./Application');
var HomePage    = require('./HomePage');
var AboutPage   = require('./AboutPage');

module.exports = (
  <Route name="app" path="/" handler={Application}>
    <Route name="about" handler={AboutPage} />
    <DefaultRoute handler={HomePage} />
  </Route>
);