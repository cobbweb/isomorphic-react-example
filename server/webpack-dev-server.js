var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('../webpack.config');

var devServer = new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  port: 7007
});

module.exports = function() {
  devServer.listen(7007, 'localhost', function (err, result) {
    if (err) {
      console.log(err);
    }

    console.log('Listening at localhost:3000');
  });
};