# DOCKER-VERSION 0.7.5

# Start with the ubuntu base image
FROM ubuntu

# make sure all packages are up to date
RUN apt-get update && apt-get upgrade

# Install some packages we need
RUN apt-get install python-software-properties python g++ make software-properties-common

# Add node repository to sources.list and update apt
RUN add-apt-repository ppa:chris-lea/node.js && apt-get update

# Install node.js
RUN apt-get install nodejs

# Drop our node app into the container:
ADD ./node-redis-hit-counter /

# Install app dependencies
RUN cd /node-redis-hit-counter && npm install

# Expose the app's listening port
EXPOSE 3000

# Run the app
CMD ["node", "/node-redis-hit-counter/app"]

# Build this container via: sudo docker build -t <your username>/node-redis-hit-counter .
# Run this container via: sudo docker run -p 49160:8080 -d <your username>/node-redis-hit-counter

