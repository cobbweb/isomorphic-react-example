var React = require('react');
var Router = require('react-router');
var routes = require('../build/main.commonjs.js');
var app = require('./bootstrap');
var router = require('koa-router')();

var scripts = '<script src="/assets/main.js"></script>';


var html = function *(url) {
  var d = Promise.defer();
  Router.run(routes, url, function (Handler) {
    d.resolve(React.renderToString(React.createElement(Handler)));
  });
  return d.promise;
};

app.use(function *(next) {
  this.html = yield html(this.url);
  yield next;
});

router.get('/:page*', function *() {
  this.body = yield this.render('index.html', { scripts: scripts, html: this.html });
});

app.use(router.routes())
   .use(router.allowedMethods());

app.listen(7001);
console.log('Server running at http://localhost:7001');
