"use strict";
//import { mongoose } from 'mongoose';
var mongoose = require('mongoose');
var dbInfo = require('./dbinfo');


module.exports.createConn = function( uri, title) {

  var conn;
  conn = mongoose.createConnection(uri, 
                  { useNewUrlParser: true,
                    useCreateIndex : true });

  // CONNECTION EVENTS
  conn.on('connected', function() {
      console.log(`${title}: connected to ${conn.host}:${conn.port}`);
      dbInfo.log(conn);
  });
  conn.on('error', function(err) {
      console.log(title, ': connection error: ', err);
  });
  conn.on('disconnected', function() {
      console.log(title, ': "disconnected" event.');
  });

  conn.closeConn = function() {
    //console.log(title, ' connection closing ...');  
    this.close(function() {
      console.log(title, ' connection closed.');         
    });
    return title;  
  };

  return conn;
};
