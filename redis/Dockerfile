# DOCKER-VERSION 0.7.5

# Start with the ubuntu base image
FROM ubuntu

# Install redis-server (looks like a hack, but just following this: http://redis.io/topics/quickstart)
RUN apt-get update && apt-get upgrade
RUN apt-get -y install wget build-essential
RUN wget http://download.redis.io/redis-stable.tar.gz
RUN tar xvzf redis-stable.tar.gz
RUN cd redis-stable && make install

# Expose the listening port
EXPOSE 16379

# Run the redis server
CMD ["redis-server"]

# Build this container via: sudo docker build -t <your username>/redis .
# Run this container via: sudo docker run -p 16379:6379 -d <your username>/redis

