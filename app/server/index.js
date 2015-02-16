// Server crap
var app     = require('koa')();
var koaws   = require('koa-ws');
var c2k     = require('koa-connect');
var serve   = require('koa-static');
var views   = require('koa-render');
var mount   = require('koa-mount');
var router  = require('koa-router')();
var getHTML = require('./getHTML');
var envs    = require('./environments');

app.env = process.env.ENVIRONMENT || envs.LOCAL;

app.use(views(__dirname, { map: { html: 'underscore' } }));
app.use(mount('/assets', serve(__dirname + '/../../build')));



// SWARM
//

var Swarm = require('swarm');
var WebSocket = require('ws');
var WSStream = require('swarm/lib/EinarosWSStream');

Swarm.env.debug = true;

var fileStorage = new Swarm.FileStorage('./swarm-data');
app.swarmHost = new Swarm.Host('swarm~nodejs', 0, fileStorage);
Swarm.env.localhost = app.swarmHost;

var apiHandler = require('swarm-restapi').createHandler({
  route: '/api',
  host: app.swarmHost,
  authenticate: function(req, cb) { cb(null, 'me'); }
});

var getResults = function *(req) {
  var d = Promise.defer();

  apiHandler(req, function(err, results) {
    if (err) {
      return d.reject(err);
    }

    d.resolve(resullts);
  });

  return d.promise;
};

router.all(/^\/api\//, function *(next) {
  var results = yield getResults(this.req);
  var json    = JSON.stringify(results);
  this.body = json;
  this.length = json.length;
  this.type = 'application/json';
});

app.use(koaws(app));

//
// END SWARM



const scripts = {
  prod:  '<script src="/assets/main.js"></script>',
  local: '<script src="//localhost:7007/assets/main.js"></script>'
};

const stylesheets = {
  prod:  '<link type="text/css" rel="stylesheet" href="/assets/main.css"></link>',
  local: ''
};

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

app.ws.server.on('connection', function(ws) {
  console.log('new connection');
  app.swarmHost.accept(new WSStream(ws), { delay: 50 });
});
