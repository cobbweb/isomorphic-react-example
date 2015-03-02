var React = require('react');
var { LeftNav } = require('material-ui');
var { Navigation } = require('react-router');

var NavMenu = React.createClass({

  mixins: [Navigation],

  menuItems: [
    { route: 'app', text: 'Home' },
    { route: 'todos', text: 'Todos' }
  ],

  onMenuItem(event, index, item) {
    this.transitionTo(item.route, item.params, item.query);
  },

  render() {
    return <LeftNav docked={false} menuItems={this.menuItems} onChange={this.onMenuItem} ref="leftNav" />
  },

  toggle() {
    this.refs.leftNav.toggle();
  }

});

module.exports = NavMenu;