var Immutable = require('immutable');
var data = Immutable.fromJS({ data: { todos: [] }});

module.exports = {
  
  setState(newData) {
    data = newData;
  },
  
  getState() {
    return data;
  }

};
