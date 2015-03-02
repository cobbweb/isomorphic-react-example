var webpack = require('webpack');

module.exports = {
  target: 'node',
  entry: [
    './src/app/routes.jsx'
  ],
  output: {
    path: __dirname + '/build/',
    filename: '[name].commonjs.js',
    library: true,
    libraryTarget: 'commonjs2',
    publicPath: '/assets/'
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, loaders: ['babel'], exclude: /node_modules(?!\/react-resolver)/ },
      { test: /\.less$/, loader: 'null' },
      { test: /\.(?:jpe?g|png|gif|svg)$/, loader: 'url?limit=10000&name=[name].[sha512:hash:base64:7].[ext]' }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  externals: [ /^(?!\.)/ ],
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({ IS_SERVER: true })
  ]
};