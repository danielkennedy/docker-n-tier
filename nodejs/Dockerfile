# DOCKER-VERSION 0.7.5

# Start with the ubuntu base image
FROM ubuntu

# make sure all packages are up to date
RUN apt-get update && apt-get upgrade

# Install some packages we need
RUN apt-get -y install python-software-properties python g++ make software-properties-common

# Add node repository to sources.list and update apt
RUN add-apt-repository ppa:chris-lea/node.js && apt-get update

# Found this trick to get around an unresolved dependency
RUN echo "deb http://archive.ubuntu.com/ubuntu precise universe" >> /etc/apt/sources.list
RUN echo "deb http://us.archive.ubuntu.com/ubuntu/ precise universe" >> /etc/apt/sources.list
RUN apt-get update

# Install node.js
RUN apt-get -y install nodejs

# Drop our node app into the container:
ADD ./app /app

# Install app dependencies
RUN cd /app && npm install
RUN printenv

# Expose the app's listening port
EXPOSE 3000

# Run the app
CMD ["node", "/app/app"]

# Build this container via: sudo docker build -t <your username>/nodejs .
# Run this container via: sudo docker run -t -i -p 3000:3000 -link redis:db -name nodeapp danielkennedy/nodejs

