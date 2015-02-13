var webpack = require('webpack');

module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:7007/',
    'webpack/hot/only-dev-server',
    './app/modules/Application/index.jsx',
    './app/modules/index.jsx'
  ],
  output: {
    path: __dirname + '/build/',
    filename: '[name].js',
    contentBase: 'http://localhost:7001',
    publicPath: 'http://localhost:7007/assets/'
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, loaders: ['react-hot', 'jsx?harmony'], exclude: /node_modules/ }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  devtool: '#inline-source-map'
};