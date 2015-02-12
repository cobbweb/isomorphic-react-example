var webpack = require('webpack');

module.exports = {
  entry: [
    './app/index.jsx'
  ],
  output: {
    path: __dirname + '/build/',
    filename: '[name].js'
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