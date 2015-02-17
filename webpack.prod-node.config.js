var webpack = require('webpack');

module.exports = {
  target: 'node',
  entry: {
    routes: './app/modules/routes.jsx'
  },
  output: {
    path: __dirname + '/build/',
    filename: '[name].commonjs.js',
    library: true,
    libraryTarget: 'commonjs2',
    publicPath: '/assets/'
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, loaders: ['jsx?harmony'] },
      { test: /\.less$/, loader: 'null' },
      { test: /\.jpe?g$/, loader: 'url?limit=10000&name=[name].[sha512:hash:base64:7].[ext]' }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      asteroid: 'asteroid/dist/asteroid.node.js'
    }
  }
};