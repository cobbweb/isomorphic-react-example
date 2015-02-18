var alt = require('../alt');

class TodoActions {

  constructor() {
    this.generateActions(
      'create'
    );
  }

}

module.exports = alt.createActions(TodoActions);