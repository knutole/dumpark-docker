#!/bin/bash

CONTAINER_NAME=wwf_store
STORAGE_PATH=/data

echo "Creating storage container $CONTAINER_NAME with path $STORAGE_PATH. Make sure the path matches in Redis config file."
docker create -v $STORAGE_PATH --name $CONTAINER_NAME busybox