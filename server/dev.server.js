var scripts = '<script src="//localhost:7007/assets/main.js"></script>';
var html = '';

var app = require('./server')(scripts, html);
app.listen(7001);
console.log('Server running at http://localhost:7001');