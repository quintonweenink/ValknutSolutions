#!/bin/bash

set -o errexit # Exit on error

node ./app.js &
sleep 2
mocha test/api/
killall node
