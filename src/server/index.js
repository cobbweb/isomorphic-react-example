// Server crap
var app     = require('koa')();
var serve   = require('koa-static');
var views   = require('koa-render');
var mount   = require('koa-mount');
var router  = require('koa-router')();
var getHTML = require('./getHTML');
var envs    = require('./environments');
var favicon = require('koa-favicon');
var path    = require('path');

const FAVICON_PATH = path.resolve(__dirname + '/../../build/favicon.ico');


app.env = process.env.ENVIRONMENT || envs.LOCAL;

app.use(views(__dirname, { map: { html: 'underscore' } }));
app.use(mount('/assets', serve(__dirname + '/../../build')));


const scripts = {
  prod:  '<script src="/assets/main.js"></script>',
  local: '<script src="//localhost:7007/assets/main.js"></script>'
};

const stylesheets = {
  prod:  '<link type="text/css" rel="stylesheet" href="/assets/main.css"></link>',
  local: ''
};

app.use(favicon(FAVICON_PATH));

app.use(function *(next) {
  this.html = yield getHTML(this.url, app.env);
  yield next;
});

router.get('/:page*', function *() {
  var js = scripts[app.env];
  var css = stylesheets[app.env];
  this.body = yield this.render('index.html', { scripts: js, html: this.html, stylesheets: css });
});

app.use(router.routes())
   .use(router.allowedMethods());

app.listen(7001);
console.log('Server running at http://localhost:7001');