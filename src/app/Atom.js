const Immutable = require('immutable');
const Cursor    = require('immutable/contrib/cursor');

class Atom {

  constructor() {
    this.callbacks = [];
    this.data = Immutable.fromJS({ data: { todos: {} }, state: { url: '/' } });
  }

  getState() {
    return this.data;
  }

  setState(data) {
    this.data = data;
    this.emitChange();
  }

  getBasicState() {
    return this.data.toJS();
  }

  setBasicState(state) {
    this.data = Immutable.fromJS(state);
  }

  emitChange() {
    this.callbacks.forEach(cb => cb());
  }

  onChange(cb) {
    this.callbacks.push(cb);
  }

  offChange(cb) {
    var index = this.callbacks.indexOf(cb);
    if (index !== -1) {
      delete this.callbacks[index];
    }
  }

  stop() {
    // TODO Prevent other stuff happening after stop() is executed
    this.callbacks = [];
  }

  getCursor(path) {
    return Cursor.from(this.data, path, newData => {
      console.log('newData (should be false)', newData === this.data);
      this.data = newData;
      this.emitChange();
    });
  }

}

module.exports = new Atom();

if (typeof window !== 'undefined') {
  window.__app__state = module.exports;
}
