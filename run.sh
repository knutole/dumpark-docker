#!/bin/bash

# daemon or interactive mode
# MODE="-d" # will run in background (for production)
MODE="-it" # will open a terminal inside container

# storage volume created by `create_storage_volume.sh`
STORAGE=wwf_store

# start container
docker run -p 443:443 --volumes-from $STORAGE $MODE timo/wwf
