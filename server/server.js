var app = require('koa')();
var router = require('koa-router')();
var serve = require('koa-static');
var views = require('koa-render');
var underscore = require('underscore');

app.use(views(__dirname + '/../app', { map: { html: 'underscore' } }));

router.get('/assets', serve('../build'));

module.exports = function(scripts, html) {
  router.get('/', function *() {
    this.body = yield this.render('index.html', { scripts: scripts, html: html });
  });

  app.use(router.routes())
     .use(router.allowedMethods());

  return app;
};