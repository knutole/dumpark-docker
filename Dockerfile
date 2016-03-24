##
# timo/wwf
#

# from base-image
FROM knutole/dumpark-base

# create folders
RUN mkdir -p /home/timo 
RUN mkdir -p /data

# copy code
ADD ./server/ /home/timo/server/

# copy ssl
ADD ssl/ /home/ssl

# copy scripts, configs
ADD ./config/ /home/timo/config/
ADD ./docker-entrypoint.sh /home/timo/
RUN chmod +x /home/timo/docker-entrypoint.sh

# default dir
WORKDIR /home/timo/

# revv
CMD ./docker-entrypoint.sh
