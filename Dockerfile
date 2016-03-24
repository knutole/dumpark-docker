##
# timo/wwf
#

# from base-image
FROM knutole/dumpark-base

# create folders
RUN mkdir -p /home/timo 
RUN mkdir -p /data
RUN mkdir -p ssl

# copy code
ADD ./server/ /home/timo/server/

# copy ssl
ADD ssl/ /home/ssl

# copy scripts, configs
ADD ./config/ /home/timo/config/
ADD ./start.sh /home/timo/

# default dir
WORKDIR /home/timo/

# revv
CMD ./start.sh
