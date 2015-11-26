### Docker

1. Install Docker on any OS: https://docs.docker.com/v1.8/installation/
2. Build docker container (`./build.sh`)
3. Start docker container (`./run.sh`)
4. Server is up! :)


5. Actually, if you want to use HTTPS, you need to add SSL certs for your server in a `ssl/` folder in root directory of repo, to match this ADD path in [Dockerfile](https://github.com/knutole/dumpark-docker/blob/master/Dockerfile#L68). Must match these names in [wwf-server.js](https://github.com/knutole/dumpark-docker/blob/master/server/wwf-server.js#L47).

