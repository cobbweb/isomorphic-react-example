#!/bin/bash


npm install

webpack-dev-server -h --port 7007 -c --progress --config webpack.config.js &
nodemon index.js

trap "kill 0" SIGINT SIGTERM EXIT

wait