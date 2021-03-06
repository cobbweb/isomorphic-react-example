var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer-core');

module.exports = {
  entry: [
    './src/app/index.jsx'
  ],
  output: {
    path: __dirname + '/build/',
    filename: '[name].js',
    publicPath: '/assets/'
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, loader: 'babel', exclude: /node_modules(?!\/react-resolver)/ },
      { test: /\.less$/, loader: ExtractTextPlugin.extract('style', 'css!postcss!less') },
      { test: /\.(?:jpe?g|png|gif|svg)$/, loader: 'url?limit=10000&name=[name].[sha512:hash:base64:7].[ext]' }
    ]
  },
  postcss: [autoprefixer],
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      pouchdb: 'pouchdb/dist/pouchdb.js'
    }
  },
  plugins: [
    new ExtractTextPlugin('[name].css'),
    new webpack.DefinePlugin({ IS_SERVER: false }),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.NoErrorsPlugin()
  ]
};