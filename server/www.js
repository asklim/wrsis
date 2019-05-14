//"use strict";
/**
 * Module dependencies.
 */

var app = require('./app-server');
var debug = require('debug')('rsisexpress:server');
var http = require('http');

// пока работает только через 'npm run compile'
//import app from '../server/app-server';
//var debug = require('debug')('rsisexpress:server');
//import http from 'http';

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3666');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

serverOutput('addr');//'full');

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}


function serverOutput(mode) {
  
  switch (mode.toLowerCase()) {
    case 'full': 
      console.log('Express server= ',  server);
      return;
    case 'addr':
      console.log('Express server= "' + server.address().address +
        '" Family= "' + server.address().family +'"');
      console.log(' listening on port ' + server.address().port);       
      return;
    default:
      console.log('');
  }
}