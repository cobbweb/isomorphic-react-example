var Immutable = require('immutable');
var data = Immutable.fromJS({ data: { todos: {} }});

module.exports = {
  
  setState(newData) {
    data = newData;
  },
  
  getState() {
    return data;
  }

};

if (typeof window !== 'undefined') {
  window.__app__state = module.exports;
}