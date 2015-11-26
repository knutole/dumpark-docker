##
# timo/wwf
#


# base image
FROM ubuntu:14.04


# install deps
RUN apt-get update && apt-get install -y \
	zip \
	tar \
	htop \
	fish \
	nmap \
	pigz \
	wget \
	htop \
	unzip \
	iotop \
	sysstat \
	mlocate \
	zlib1g-dev \
	subversion \
	build-essential \
	libgcrypt11-dev \
	software-properties-common \
	python-software-properties \
	git build-essential g++ flex bison gperf ruby perl libsqlite3-dev libfontconfig1-dev libicu-dev libfreetype6 libssl-dev libpng-dev 


# more deps
RUN apt-get install -y libjpeg-dev


# install nodejs
ADD ./install/install-nodejs.sh /tmp/
RUN sh /tmp/install-nodejs.sh


# install phantomjs
ADD ./install/install-phantomjs.sh /tmp/
RUN sh /tmp/install-phantomjs.sh


# install redis
ADD ./install/install-redis.sh /tmp/
RUN sh /tmp/install-redis.sh


# install node modules
RUN npm install grunt-cli -g
RUN npm install nodemon -g
RUN npm install forever -g


# create folders
RUN mkdir /home/timo 
RUN mkdir /data


# copy code
ADD ./server/ /home/timo/server/


# copy ssl
ADD ssl/ /home/ssl


# copy scripts, configs
ADD ./config/ /home/timo/config/
ADD ./start.sh /home/timo/


# expose ports
EXPOSE 443
EXPOSE 80


# default dir
WORKDIR /home/timo/


# terminal
ENV TERM xterm


# revv
CMD ./start.sh





