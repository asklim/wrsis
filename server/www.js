require( 'dotenv' ).config();
const {
  app: rsisWebApp,
  databasesShutdown,
  viberBot
} = require( './app-server' );
const debug = require( 'debug' )('sapp:www');
const http = require( 'http' );
const util = require( 'util' );
const os = require( 'os' );
const chalk = require( 'react-dev-utils/chalk' );

const icwd = require('fs').realpathSync( process.cwd());
let version = require( `${icwd}/package.json` ).version;

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
const handleOnError = error =>
{
  if( error.syscall !== 'listen' ) {
    throw error;
  }
  let bind = typeof port === 'string' ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch( error.code ) {
    case 'EACCES':
      console.error( bind + ' requires elevated privileges' );
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error( bind + ' is already in use' );
      process.exit(1);
      break;
    default:
      throw error;
  }
};

/**
 * Event listener for HTTP server "listening" event.
 */
const handleOnListening = () => {
  let addr = server.address();
  let bind = typeof addr === 'string' ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
};


const serverAppOutput = (outputMode, appVersion, httpServer) => 
{  
  let addr = httpServer.address();
  let { address, family, port } = addr;
  let bind = typeof addr === 'string' ? 'pipe ' + addr
    : 'port ' + port;

  const outputs = {
    full: 
    () => console.log( 'Express server = ',  httpServer ),
    addr: 
    () => {
      console.log( '\tapp version ', chalk.cyan( appVersion ));
      console.log(
        '\tExpress server = "' + address + '" Family= "' + family +'"\n',
        '\tlistening on ' + bind );
    },
    default: () => console.log( '\n' )
  };  
  (outputs[ outputMode.toLowerCase() ] || outputs[ 'default' ])();
};

console.log( process.env );
let {
  PWD, USER, NAME,
} = process.env;
let userInfo = util.format('%O', os.userInfo());
console.log( chalk.red( 'package.json dir is ', icwd )); // = '/app'
console.log( chalk.red( `PWD (${__filename}) is ${PWD}` ));
console.log( chalk.red( `USER @ NAME is ${USER} @ ${NAME}` ));
console.log( chalk.cyan( `platform is ${os.platform()}, hostname is ${os.hostname()}` ));
console.log( chalk.yellow( 'User Info : ', userInfo ));



/*******************************************************
 * Get port from environment and store in Express.
 */
const port = normalizePort( process.env.PORT || '3666' );
rsisWebApp.set( 'port', port );

/**
 * Create HTTP server.
 */
const server = http.createServer( rsisWebApp );
const shutdownTheServer = () => new Promise( 
  (resolve) => {  
    server.close( () => {
      console.log( 'http-server closed now.' );
      resolve();
    });
});
server.on( 'error', handleOnError );
server.on( 'listening', handleOnListening );
server.on( 'clientError', (err, socket) => {
  socket.end( 'HTTP/1.1 400 Bad Request\r\n\r\n' );
});
server.on( 'close', () => {
  console.log( 'http-server closing ....' );
  }
);
/**
 * Listen on provided port, on all network interfaces.
 */
server.listen( port, 
() => {
  serverAppOutput( 'addr'/*'full'*/, version, server );  
  console.log( `Set webhook for Viber Application running on port: ${port}` );
  viberBot.setWebhook( `${process.env.API_SERVER}/viber/webhook` )
  .catch( error => {
      console.log( 'Can not set webhook on following server.' );
      console.error(error);
  });
});



// CAPTURE APP TERMINATION / RESTART EVENTS
// For nodemon restarts
process.once( 'SIGUSR2', () => {
  databasesShutdown( 'nodemon restart', () => { 
    shutdownTheServer().then( () => {
      process.kill( process.pid, 'SIGUSR2' ); 
    });
  });
});

// For app termination
process.on( 'SIGINT', () => {
  databasesShutdown( 'app termination', () => { 
    shutdownTheServer().then( () => { process.exit(0); });
  });
});

// For Heroku app termination
process.on('SIGTERM', () => {
  databasesShutdown( 'Heroku app termination', () => {
      shutdownTheServer().then( () => { process.exit(0); });
  });
});
