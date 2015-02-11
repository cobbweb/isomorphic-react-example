var React = require('react');
var Application = require('../build/main.commonjs.js');

var scripts = '<script src="/assets/main.js"></script>';
var html = React.renderToString(React.createElement(Application));

var app = require('./server')(scripts, html);
app.listen(7001);
console.log('Server running at http://localhost:7001');