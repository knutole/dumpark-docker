#!/bin/bash

cd /opt/
mkdir phantomJS
cd phantomJS
git clone git://github.com/ariya/phantomjs.git
cd phantomjs
git checkout 2.0.0
./build.sh --confirm --jobs 8
ln -s /opt/phantomJS/phantomjs/bin/phantomjs /usr/bin/phantomjs