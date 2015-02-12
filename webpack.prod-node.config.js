var webpack = require('webpack');

module.exports = {
  target: 'node',
  entry: [
    './app/routes.jsx'
  ],
  output: {
    path: __dirname + '/build/',
    filename: '[name].commonjs.js',
    library: true,
    libraryTarget: 'commonjs2'
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, loaders: ['jsx?harmony'] }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
};