docker-n-tier
=============
This repository is the result of an experiment demonstrating how to build an n-tier application stack in multiple [docker](http://www.docker.io/) containers on a single [CoreOS](https://coreos.com/) VM. The application is a simple [node](http://nodejs.org/)/[express](http://expressjs.com/) web app that tracks hits in a [redis](http://redis.io/) database.

## Dependencies:
- This setup was tested on my Ubuntu 12.04 machine.
- [VirtualBox](https://www.virtualbox.org/wiki/Linux_Downloads)
- [Vagrant](http://www.vagrantup.com/downloads.html)

## Setup

### Get the virtual machine running (from your host machine)

    $ git clone git@github.com:danielkennedy/docker-n-tier.git
    $ cd docker-n-tier/
    $ vagrant up
    $ vagrant ssh

### Build and run the docker containers (on your guest/CoreOS machine)
Note: You could do this several ways, but for simplicity's sake, I recommend simply cloning this repo again on the guest machine.

    $ git clone git@github.com:danielkennedy/docker-n-tier.git
    $ cd docker-n-tier/redis
    $ docker build -t mysandbox/redis .
    $ docker run -name redis -p 6379:6379 -d mysandbox/redis
    $ cd ../nodejs
    $ docker build -t mysandbox/nodejs .
    $ docker run -t -i -p 3000:3000 -link redis:db -name nodeapp -d mysandbox/nodejs

## Test it
### Browser
On your host machine, open a browser and connect to http://localhost:8080/. If everything worked to this point, you should see a "hit count" of 1. Refresh the page, and you'll see it increment.
### Database

    $ redis-cli -h localhost -p 16379
    localhost:16379> get requests
    "2"

## Details
Several details had to come together to make this demo work. What follows are a handful of tips/tricks that will explain the lessons learned from this exercise.

### Vagrant
The most important piece, other than the box image (which was provided by CoreOS maintainers), is the networking component. For my example, I needed to be sure that I could reach the node application from my host machine. Beyond that, I also wanted to be able to query the redis database directly from my host system for debugging/convenience purposes.

    config.vm.network "forwarded_port", guest: 3000, host: 8080
    config.vm.network "forwarded_port", guest: 6379, host: 16379


### Docker
Linking the docker containers to allow the node app to communicate with the redis database was the trickiest part of this whole setup. For a more detailed explanation of how this works, see [this great article](http://docs.docker.io/en/latest/use/working_with_links_names/).

### Node Application
Finally, the node app needs to be able to find the redis database in order to make this work. The application is a generated express app with a very slightly modified index.js route:

    var redis = require('redis');
    var port = process.env.DB_PORT_6379_TCP_PORT || 6379;
    var hostname = process.env.DB_PORT_6379_TCP_ADDR || 'localhost';
    var client = redis.createClient(port, hostname);

## Next Steps
In order to be a complete solution, I'll need to continue with:
- Orchestrating the boot sequence with [systemd](https://coreos.com/docs/launching-containers/launching/getting-started-with-systemd/), to start the containers with each boot
- Introduce service discovery with [etc](https://coreos.com/docs/cluster-management/setup/getting-started-with-etcd/), to allow more flexibility than environment variables
