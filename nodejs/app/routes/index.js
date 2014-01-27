
/*
 * GET home page.
 */

var redis = require('redis');
var port = process.env.DB_PORT_6379_TCP_PORT || 6379;
var hostname = process.env.DB_PORT_6379_TCP_ADDR || 'localhost';
var client = redis.createClient(port, hostname);

exports.index = function(req, res){
  client.incr("requests", function (err, reply) {
    console.log('INCR replied with:', reply);
    res.render('index', { title: 'Express', hits: reply });
  });
};
