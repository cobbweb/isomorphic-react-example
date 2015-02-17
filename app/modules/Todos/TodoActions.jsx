var alt = require('../alt');

class TodoActions {

  constructor() {
    this.generateActions(
      'create',
      'remove'
    );
  }

}

module.exports = alt.createActions(TodoActions);