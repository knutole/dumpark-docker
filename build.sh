#!/bin/bash

# create ssl folder if not exists
mkdir -p ssl

# build docker container (timo/wwf name could be anything, but must be matched in run.sh)
docker build -t timo/wwf .
