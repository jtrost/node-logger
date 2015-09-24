Tail = require('tail').Tail;

var forever = require('forever-monitor');
var request = require('./models/request');
var db      = require('./db');
var domains = [];
var tails   = [];

db.connect();

for(i = 0; i < domains.length; i++) {
  tails[domains[i]] = new Tail(domains[i]+".access.log");

  tails[domains[i]].on("line", function(line) {
    request.create(this.filename, line);
  });

  tails[domains[i]].on("error", function(error) {
    console.log('ERROR: ', error);
  });
}