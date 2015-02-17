Todos = new Mongo.Collection('todos');

if (Meteor.isServer) {
  Meteor.publish('todos', function() {
    return Todos.find();
  });
}

if (Meteor.isClient) {
  Template.body.helpers({
    tasks: function() {
      return Todos.find({});
    }
  })
}