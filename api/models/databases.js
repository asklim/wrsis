"use strict";
//var mongoose = require('mongoose');
var gracefulShutdown;

var dbCfg;
var dbTmp;
//var dbWNext;
//var dbWCur;
//var dbWPrev;


module.exports.getDB = function(dbType) {
    
  if (typeof dbType !== 'string') {
    console.log('dbType must be a string.');
    return;
  }
  //console.log('getDB : ',); 
  switch (dbType.toLowerCase()) {
    case 'config': { return dbCfg; }
    case 'temp' : return dbTmp;
  }
};


module.exports.createConns = function() {

  if (dbCfg == undefined) {
    dbCfg = require('./dbrsiscfg');
  }

  if (dbTmp == undefined) {
    dbTmp = require('./dbrsistmp');
  }

  // CAPTURE APP TERMINATION / RESTART EVENTS

  // For nodemon restarts
  process.once('SIGUSR2', function() {
      gracefulShutdown('nodemon restart', function() {
          process.kill(process.pid, 'SIGUSR2');
      });
  });
  // For app termination
  process.on('SIGINT', function() {
      gracefulShutdown('app termination', function() {
          process.exit(0);
      });
  });
  // For Heroku app termination
  process.on('SIGTERM', function() {
      gracefulShutdown('Heroku app termination', function() {
          process.exit(0);
      });
  });
};

// To be called when process is restarted or terminated
gracefulShutdown = async function(msg, callback) {
  
  Promise.all([dbTmp.closeConn(),
               dbCfg.closeConn()]).then((messages) => {
    console.log('dbs closed: ', messages);
    console.log('Mongoose disconnected through ' + msg);
    callback();  
  });
  
/*  
  for (const f of [dbTmp.closeConn,
                   dbCfg.closeConn]) {
    await f();
  }
  console.log('Mongoose disconnected through ' + msg);
  callback();*/
};