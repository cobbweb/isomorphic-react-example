var Asteroid = require('asteroid');
var backend = new Asteroid('localhost:3000');

backend.on('connected', function() {
  console.log('connected');
});

var sub = backend.subscribe('todos');

sub.ready.then(function() {
  console.log('ready');
});

var Todos = backend.getCollection('todos');
Todos.insert({ text: 'Isomorphic' });

setTimeout(function() {

  var todos = Todos.reactiveQuery({});

  console.log(todos);

  todos.on('change', function() {
    console.log('changed');
    console.log(todos.result);
  });

  Todos.insert({ text: 'Isomorphic2' })
}, 1000);