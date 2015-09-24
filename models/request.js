/*
Database: amps_logger
Collection: requests

Mongo shell usage:
> use amps_logger
switched to db amps_logger
> db.requests.count()
4
*/

var mongoose = require('mongoose');
var Helper = require('../helper');
var ObjectID = require('mongodb').ObjectID;
var line_regex = /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\s-\s(.+)\s\[(.+)\]\s\"(\w+)\s(.+)\sHTTP\/\d.\d\"\s(\d{3})\s(\d+)\s\"(http.+)\"\s\"(Mozilla.+)\"\s\"(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})\"/;

// Public API
module.exports = {
  create: function(log_file, line){
    log_file_parts = log_file.split("/");
    domain = log_file_parts[log_file_parts.length-1].split(".access.log")[0]
    console.log(domain);
    line_parts = line_regex.exec(line);

    mongoose.model('Request').create({
      _id:       new ObjectID(),
      user:      line_parts[1],
      loggedAt:  Helper.datetime(line_parts[2]),
      domain:    domain,
      method:    line_parts[3],
      path:      line_parts[4],
      status:    line_parts[5],
      bytesSent: line_parts[6],
      referer:   line_parts[7],
      userAgent: line_parts[8],
      ip:        line_parts[9],
      raw:       line_parts[0]
    }, function (err, request) {
      if (!err){
        console.log("Inserted request: "+request);
      } else {
        console.log(err);
      }
    });
  },
  model: mongoose.model('Request', {
    user:      { type: String },
    loggedAt:  { type: Date },
    domain:    { type: String },
    method:    { type: String },
    path:      { type: String },
    status:    { type: String },
    bytesSent: { type: Number },
    referer:   { type: String },
    userAgent: { type: String },
    ip:        { type: String },
    raw:       { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  })
};