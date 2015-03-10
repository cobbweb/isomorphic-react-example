var alt = require('../alt');

class TodoActions {

  constructor() {
    this.generateActions(
      'create',
      'setState',
      'remove',
      'removeAll'
    );
  }

}

module.exports = alt.createActions(TodoActions);
