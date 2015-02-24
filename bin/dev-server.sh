#!/bin/bash

# Change to bin
cd $(dirname $([ -L $0 ] && readlink -f $0 || echo $0))
# Then change up
cd ../

npm install

webpack-dev-server -h --port 7007 -c --progress --config ./webpack.config.js --devtool eval &
nodemon ./index.js

trap "kill 0" SIGINT SIGTERM EXIT

wait