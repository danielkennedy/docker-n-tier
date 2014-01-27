# DOCKER-VERSION 0.7.5

# Start with the ubuntu base image
FROM ubuntu

# make sure all packages are up to date
RUN apt-get update && apt-get upgrade

# Install redis-server
RUN apt-get install redis-server

# Drop our node app into the container:
ADD ./redis.conf /etc/redis/

# Expose the listening port
EXPOSE 6379

# Run the redis server
CMD ["redis-server"]

# Build this container via: sudo docker build -t <your username>/redis .
# Run this container via: sudo docker run -p 49160:8080 -d <your username>/redis

