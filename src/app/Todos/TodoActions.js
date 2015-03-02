var alt = require('../alt');

class TodoActions {

  constructor() {
    this.generateActions(
      'create',
      'setState',
      'remove'
    );
  }

}

module.exports = alt.createActions(TodoActions);
