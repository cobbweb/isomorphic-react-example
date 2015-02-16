var Swarm = require('swarm');
var TodoItem = require('./TodoItem');

var TodoList = Swarm.Vector.extend('TodoList', {

  objectType: TodoItem

});

module.exports = TodoList;