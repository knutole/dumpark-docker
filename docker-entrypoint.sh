#!/bin/bash

# start redis
redis-server /home/timo/config/redis.conf &

# enter directory
cd /home/timo/server/

# install node modules
npm install

# start wwf-server
# nodemon wwf-server.js # use nodemon for debug (will restart on code-changes) 
forever wwf-server.js 	# use forever instead of nodemon for production (never goes down)
