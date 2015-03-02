var React = require('react');
var NavMenu = require('../NavMenu');
var { AppCanvas, AppBar, EnhancedButton } = require('material-ui');
var { RouteHandler } = require('react-router');

require('./styles.less');

var icon = require('./drink.png');

var Application = React.createClass({

  render() {
    return (
      <AppCanvas predefinedLayout={1}>
        <AppBar showMenuIconButton={true} title="Isomorphic React" onMenuIconButtonTouchTap={this._onMenuIconButtonTouchTap}>
          <EnhancedButton className='app-bar-icon-button'>
            <img className='app-bar-icon' src={icon} alt="Isomorphic React Icon" />
          </EnhancedButton>
        </AppBar>

        <NavMenu ref="navMenu" />

        <section>
          <RouteHandler />
        </section>
      </AppCanvas>
    );
  },

  _onMenuIconButtonTouchTap() {
    this.refs.navMenu.toggle();
  }

});

module.exports = Application;