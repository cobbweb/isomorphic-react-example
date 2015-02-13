var React = require('react');

var backgroundImage = require('./buildingclock.jpg');

var HomePage = React.createClass({

  render() {
    return (<div>
      Home Page
      <img alt="Build Clock" src={backgroundImage} />
    </div>);
  }

});

module.exports = HomePage;