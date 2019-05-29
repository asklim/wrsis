const app = require('./app-server');
const debug = require('debug')('rsisexpress:server');
const http = require('http');
const chalk = require('react-dev-utils/chalk');
const icwd = require('fs').realpathSync(process.cwd());

let version = require(`${icwd}/package.json`).version;

// пока работает только через 'npm run compile'
//import app from '../server/app-server';
//var debug = require('debug')('rsisexpress:server');
//import http from 'http';

/**
 * Normalize a port into a number, string, or false.
 */
const normalizePort = val =>
{
  let port = parseInt(val, 10);
  if( isNaN(port) ) {  // named pipe
    return val;
  }
  if( port >= 0 ) {    // port number
    return port;
  }
  return false;
};

/**
 * Event listener for HTTP server "error" event.
 */
const onError = error =>
{
  if (error.syscall !== 'listen') {
    throw error;
  }
  let bind = typeof port === 'string' ? 'Pipe ' + port
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
};

/**
 * Event listener for HTTP server "listening" event.
 */
const onListening = () => {
  let addr = server.address();
  let bind = typeof addr === 'string' ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
};


const serverOutput = mode => 
{  
  switch (mode.toLowerCase()) {
    case 'full': 
      console.log('Express server= ',  server);
      return;
    case 'addr':
      // don't work on herokuapp.com: process.env.npm_package_version
      console.log('app version ', chalk.cyan(version));
      console.log(
        'Express server= "' + server.address().address +
        '" Family= "' + server.address().family +'"\n',
        ' listening on port ' + server.address().port
      );       
      return;
    default:
      console.log('\n');
  }
};



/*******************************************************
 * Get port from environment and store in Express.
 */
const port = normalizePort(process.env.PORT || '3666');
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

serverOutput('addr');//'full');
