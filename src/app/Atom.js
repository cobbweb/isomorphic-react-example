const Immutable = require('immutable');

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

  getIn() {
    return this.data.getIn.apply(this.data, arguments);
  }

  setIn() {
    this.data.setIn.apply(this.data, arguments);
    this.emitChange();
  }

}

module.exports = new Atom();

if (typeof window !== 'undefined') {
  window.__app__state = module.exports;
}