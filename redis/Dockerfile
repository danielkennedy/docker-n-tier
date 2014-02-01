# DOCKER-VERSION 0.7.5

# Start with the ubuntu base image
FROM ubuntu:precise

# Install redis-server (looks like a hack, but just following this: http://redis.io/topics/quickstart)
RUN apt-get update
RUN apt-get -y install wget build-essential
RUN wget http://download.redis.io/redis-stable.tar.gz
RUN tar xvzf redis-stable.tar.gz
RUN cd redis-stable && make install

# Expose the listening port
EXPOSE 6379

# Run the redis server
CMD ["redis-server"]

# Build this container via: sudo docker build -t danielkennedy/redis .
# Run this container via: sudo docker run -name redis -p 6379:6379 -d danielkennedy/redis 

