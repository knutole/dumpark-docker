#!/bin/bash

MODE="-it" # interactive mode
# MODE="-d" # daemon mode (for production)

# run in prod mode
docker run -p 443:443 $MODE timo/wwf
