#!/bin/bash

# Change to bin
cd $(dirname $([ -L $0 ] && readlink -f $0 || echo $0))
# Then change up
cd ../

# Deps update
npm install

# Start meteor backend
cd app/backend
MONGO_URL=mongodb://localhost:27017/isomorphic-react meteor &
cd ../../

# Run prod server
ENVIRONMENT='prod' nodemon index.js

# Kill all the things when the script exits
trap "kill 0" SIGINT SIGTERM EXIT

wait
