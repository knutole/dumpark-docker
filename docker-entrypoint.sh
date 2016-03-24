#!/bin/bash

# start redis
redis-server /home/timo/config/redis.conf &

# start wwf-server
cd /home/timo/server/
nodemon wwf-server.js 
# forever wwf-server.js 	# use forever instead of nodemon for production (never goes down)
