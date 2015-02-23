require('babel/register')({
  ignore: /node_modules\/(?!react-resolver)/
});
require('./src/server');
