#!/bin/bash

# folder that holds certs
cp -r /var/www/ssl . 

# build docker container
docker build -t timo/wwf .

# remove ssl folder
rm ssl -r