#!/bin/bash

echo "start server"
npm run start-server &
echo 'start client -'
PORT=8000 npm run start-client &
wait