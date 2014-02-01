# DOCKER-VERSION 0.7.5

# Start with the ubuntu base image
FROM ubuntu

# Install redis-server (looks like a hack, but just following this: http://redis.io/topics/quickstart)
RUN apt-get -y update
RUN apt-get -y install wget build-essential
RUN wget http://download.redis.io/redis-stable.tar.gz
RUN tar xvzf redis-stable.tar.gz
RUN cd redis-stable && make install

# Expose the listening port
EXPOSE 6379

# Run the redis server
CMD ["redis-server"]

# Build this container via: docker build -t mysandbox/redis .
# Run this container via: docker run -name redis -p 6379:6379 -d mysandbox/redis 

