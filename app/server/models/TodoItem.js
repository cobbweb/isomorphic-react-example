var Swarm = require('swarm');

var TodoItem = Swarm.Model.extend('TodoItem', {

  defaults: {
    test: ''
  }

});

module.exports = TodoItem;