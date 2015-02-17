var envs = require('./environments');

module.exports = function* (url, env) {
  var d = Promise.defer();

  if (env !== envs.LOCAL) {
    // App crap
    var React = require('react');
    var Router = require('react-router');
    var routes = require('../../build/routes.commonjs.js');

    var Asteroid = require('asteroid');
    var asteroid = new Asteroid('localhost:3000');

    var Todos = asteroid.getCollection('todos');
    var sub = asteroid.subscribe('todos');
    var todos = Todos.reactiveQuery({});


    sub.ready.then(function(result) {
      console.log(result);
      console.log('asdas');
      d.resolve('');

    }).done();

  } else {
    d.resolve('');
  }

  return d.promise;
};
