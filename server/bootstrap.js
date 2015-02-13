var app = require('koa')();
var serve = require('koa-static');
var views = require('koa-render');
var mount = require('koa-mount');

app.use(views(__dirname + '/../app', { map: { html: 'underscore' } }));
app.use(mount('/assets', serve(__dirname + '/../build')));


module.exports = app;