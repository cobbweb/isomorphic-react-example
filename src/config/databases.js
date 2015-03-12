var CLIENT = {
  todos: {
    database: 'todos',
    replicateTo: 'http://localhost:5984/todos'
  }
};

var SERVER = {
  todos: {
    database: 'http://localhost:5984/todos'
  }
};

// IS_SERVER is defined in Webpack config
module.exports = IS_SERVER ? SERVER : CLIENT;
