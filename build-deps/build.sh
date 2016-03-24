#!/bin/bash

echo "Building base image (NodeJS, PhantomJS, Redis)..."
docker build -t knutole/dumpark-base .