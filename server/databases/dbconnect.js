//import { mongoose } from 'mongoose';
const mongoose = require('mongoose');
const infoDB = require('./infodb');


module.exports.createConn = function( uri, title) {

  const conn = mongoose.createConnection(uri, 
                  { useNewUrlParser: true,
                    useCreateIndex : true });

  // CONNECTION EVENTS
  conn.on('connected', function() {
      console.log(`${title}: connected to ${conn.host}:${conn.port}`);
      infoDB.log(conn);
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
