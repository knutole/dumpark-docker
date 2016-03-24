#!/bin/bash

MODE="-it" # interactive mode
# MODE="-d" # daemon mode (for production)

# start container
docker run -p 443:443 $MODE timo/wwf
