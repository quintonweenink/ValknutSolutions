#!/bin/bash

set -o errexit # Exit on error

node ./app.js > /dev/null &
sleep 1
mocha test/api/
killall node
