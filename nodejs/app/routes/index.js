
/*
 * GET home page.
 */

var redis = require('redis');
var port = 6379;
var hostname = 'localhost';
var client = redis.createClient(port, hostname);

exports.index = function(req, res){
  client.incr("requests", function (err, reply) {
    console.log('INCR replied with:', reply);
  });
  res.render('index', { title: 'Express' });
};
