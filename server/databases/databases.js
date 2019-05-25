//var mongoose = require('mongoose');
var gracefulShutdown;

var dbCfg;
var dbTmp;
var dbSum;
//var dbWeekNext;
//var dbWeekCur;
//var dbWeekPrev;

/**
 * name getDB
 * @memberof /api/models 
 * @summary Возвращает указанную базу данных
 * @param {String} dbType The database type
 * @return {Mongoose.Connection} The connection to database
 */
module.exports.getDB = function(dbType) {
    
  if (typeof dbType !== 'string') {
    console.log('dbType must be a string.');
    return;
  }
  //console.log('getDB : ',); 
  switch (dbType.toLowerCase()) {
    case 'config': return dbCfg;
    case   'temp': return dbTmp;
    case    'sum': return dbSum;
  }
};


module.exports.createConns = function() {

  if (dbCfg == undefined) {
    dbCfg = require('./dbrsiscfg');
  }

  if (dbSum == undefined) {
    dbSum = require('./dbrsissum');
  }

  if (dbTmp == undefined) {
    dbTmp = require('./dbrsistmp');
  }

  // CAPTURE APP TERMINATION / RESTART EVENTS

  // For nodemon restarts
  process.once('SIGUSR2', () => {
      gracefulShutdown('nodemon restart', 
        () => { process.kill(process.pid, 'SIGUSR2'); }
      );
  });
  
  // For app termination
  process.on('SIGINT', () => {
      gracefulShutdown( 'app termination', 
        () => { process.exit(0); }
      );
  });

  // For Heroku app termination
  process.on('SIGTERM', () => {
      gracefulShutdown( 'Heroku app termination', 
        () => { process.exit(0); }
      );
  });
};

// To be called when process is restarted or terminated
gracefulShutdown = (msg, shutdown) => {
  
  Promise.all([
    dbTmp.closeConn(),
    dbSum.closeConn(),
    dbCfg.closeConn()
  ])
  .then( dbsNames => {
    console.log('dbs closed: ', dbsNames);
    console.log('Mongoose disconnected through ' + msg);
    shutdown();  
  })
  .catch( error => {
    console.log(error.message);
  });
  
/*  
  for (const f of [dbTmp.closeConn,
                   dbCfg.closeConn]) {
    await f();
  }
  console.log('Mongoose disconnected through ' + msg);
  callback();*/
};