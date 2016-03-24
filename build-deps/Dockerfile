##
# timo/wwf
#

# base image
FROM ubuntu:14.04

# install deps
RUN apt-get update && apt-get install -y \
	zip \
	git \
	tar \
	htop \
	fish \
	nmap \
	pigz \
	wget \
	htop \
	unzip \	
	g++ \
	flex \
	bison \
	gperf \
	ruby \
	perl \
	iotop \
	sysstat \
	mlocate \
	zlib1g-dev \
	subversion \
	build-essential \
	libgcrypt11-dev \
	software-properties-common \
	python-software-properties \
	build-essential \
	libsqlite3-dev \
	libfontconfig1-dev \
	libicu-dev \
	libfreetype6 \
	libssl-dev \
	libpng-dev \
	libjpeg-dev

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
RUN npm install grunt-cli nodemon forever -g

# expose ports
EXPOSE 443
EXPOSE 80

# terminal
ENV TERM xterm

# print versions
CMD "node --version && phantomjs --version && redis-cli --version"