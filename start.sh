#!/bin/bash

# start nginx
# nginx -c /home/timo/config/nginx.conf &

# start redis
redis-server /home/timo/config/redis.conf &

# start wwf-server
cd /home/timo/server/
# forever wwf-server.js
nodemon wwf-server.js