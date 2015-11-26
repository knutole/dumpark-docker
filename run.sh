#!/bin/bash

# run the docker container in dev mode
docker run -p 443:443 -v /home/timo/docker:/home/timo -it timo/wwf

# run in prod mode
# docker run -p 443:443 -d timo/wwf


# -p 443:443 				# means that the 443 port of the outside box (ie. your server) is tunnelled directly to the 443 port of the docker container
# -v /home/timo/docker:/home/timo 	# mirrors a folder on the outside box to a folder inside the container, so container can read/write directly to outside box. this is for development purposes only.
# -it / -d				# interactive mode (you'll be put inside a running container when starting). alternative is "-d", which is daemon mode, good for production
# timo/wwf 				# name of the container, which is designated when building the container (see in build.sh)

