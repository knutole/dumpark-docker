## Base image

Dockerfile for creating base image. 

Contains NodeJS, PhantomJS, Redis.
Exposes ports 80, 443.

Should not be necessary to build this, as image is already available on Docker Hub @ `knutole/dumpark-base`.