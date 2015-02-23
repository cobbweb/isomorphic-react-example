var envs = require('./environments');

module.exports = function *(url, env) {
  var d = Promise.defer();
  if (env !== envs.LOCAL) {
    // App crap
    var React = require('react');
    var Router = require('react-router');
    var resolver = require('react-resolver').create();
    var routes   = resolver.route(require('../../build/main.commonjs.js'));

    Router.run(routes, url, function (Handler) {
      resolver.handle(Handler).then(() => {
        d.resolve(React.renderToString(React.createElement(Handler)));
      });
    });
  } else {
    d.resolve('');
  }
  return d.promise;
};