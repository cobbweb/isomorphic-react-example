var Alt = require('alt');
var Asteroid = require('asteroid');

var alt = new Alt();
alt.backend = new Asteroid('localhost:3000');

module.exports = alt;