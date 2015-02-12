var app = require('./server');
var router = require('koa-router')();

var scripts = '<script src="//localhost:7007/assets/main.js"></script>';
var html = '';

router.get('/:page*', function *() {
  this.body = yield this.render('index.html', { scripts: scripts, html: '' });
});

app.use(router.routes())
   .use(router.allowedMethods());

app.listen(7001);
console.log('Server running at http://localhost:7001');