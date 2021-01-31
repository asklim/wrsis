require( 'dotenv' ).config();

const {
    app: rsisWebApp,
    databasesShutdown,
    viberBot
} = require( './app-server' );

const debug = require( 'debug' )( 'sapp:www' );
const http = require( 'http' );
const util = require( 'util' );
const os = require( 'os' );
const colors = require( 'colors' );


//const log = require( './helpers/logger')('wwwSrvr:');
const { icwd } = require( './helpers/serverconfig' );
const version = require( `${icwd}/package.json` ).version;



// ********************************************************  //

/**
 * Выводит переменные окружения process.env.*,
 * но без npm_* переменых, которых очень много
 *  
**/
(function () {
    
    function isSecretEnvVar( varName ) {
        
        const secretKeys = [
            'JWT_SECRET', 
            'ATLAS_CREDENTIALS', 'VIBER_CHAT_TOKEN',
            'GOOGLE_MAP_API_KEY', 'RSIS_GOOGLE_API_KEY'
        ];
        return secretKeys.includes( varName );
    }
    
    const envWithoutNpm = {};

    Object.keys( process.env )
    .forEach( (key) => {
        if( isSecretEnvVar( key )) {
            envWithoutNpm[ key ] = '***';
        }
        else if( !key.startsWith('npm_') ) {
            envWithoutNpm[ key ] = process.env[ key ];
        }
    });     
    console.log( envWithoutNpm );
})();

const { PWD, USER, NAME, } = process.env;

const userInfo = util.format( '%O', os.userInfo() );

console.log( colors.red( `package.json dir is ${icwd}` )); // = '/app'
console.log( `PWD (${__filename}) is ${PWD}`.red );
console.log( `USER @ NAME is ${USER} @ ${NAME}`.red );
console.log( `platform is ${os.platform()}, hostname is ${os.hostname()}`.red );
console.log( 'User Info : ', userInfo.yellow );



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
    }
);


/**
 * Event listener for HTTP server "error" event.
 */
const handleOnError = error => {

    if( error.syscall !== 'listen' ) {
        throw error;
    }

    let bind = typeof port === 'string' 
        ? 'Pipe ' + port
        : 'Port ' + port
    ;

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

    const addr = server.address();
    const bind = typeof addr === 'string' 
        ? 'pipe ' + addr
        : 'port ' + addr.port
    ;
    debug( 'Listening on ' + bind );
};

server.on( 'error', handleOnError );

server.on( 'listening', handleOnListening );

server.on( 'clientError', (_err, socket) => {

    socket.end( 'HTTP/1.1 400 Bad Request\r\n\r\n' );
});

server.on( 'close', () => {

    console.log( 'http-server closing ...' );
});



/**
 * Listen on provided port, on all network interfaces.
**/
server.listen( port, () => {

    serverAppOutput( 'addr'/*'full'*/, version, server );

    console.log( `Try set webhook for Viber Application on port: ${port}` );
    const viberHookURL = `${process.env.API_SERVER}/viber/mikavitebsk`;
    
    viberBot
    .setWebhook( viberHookURL )
    .catch( error => {
        console.log( `Can not set webhook on ${viberHookURL}.` );
        console.error( error );
    });
});


// ****************************************************************
// CAPTURE APP TERMINATION / RESTART EVENTS

// For nodemon restarts
process.once( 'SIGUSR2', () => {

    databasesShutdown( 'nodemon restart', () => {

        shutdownTheServer()
        .then( () => {
            process.kill( process.pid, 'SIGUSR2' );
        });
    });
});


// For app termination
process.on( 'SIGINT', () => {

    databasesShutdown( 'app termination', () => {

        shutdownTheServer()
        .then( 
            function () {
                setTimeout(
                    () => { process.exit(0); },
                    1000
                );
            }
        );
    });
});


// For Heroku app termination
process.on('SIGTERM', () => {

    databasesShutdown( 'Heroku app termination', () => {

        shutdownTheServer()
        .then( 
            function () {
                setTimeout(
                    () => { process.exit(0); },
                    1000
                );
            }
        );
    });
});




/**
 * @description
 *  Normalize a port into a number, string, or false.
 * 
 */
function normalizePort (val) {

    let port = parseInt( val, 10 );

    return isNaN( port )
        ? val       // named pipe
        : port >= 0
            ? port  // port number
            : false
    ;
}



function serverAppOutput( outputMode, appVersion, httpServer ) {


    let addr = httpServer.address();
    let { 
        address, family, port 
    } = addr;

    let bind = typeof addr === 'string' 
        ? 'pipe ' + addr
        : 'port ' + port
    ;

    const outputs = {
        full: () => console.log( 'Express server = ',  httpServer ),
        addr: () => {
            const { NODE_ENV } = process.env;
            console.log( 'app version ', appVersion.cyan );
            console.log( 'NODE Environment is ', NODE_ENV );
            console.log(
                'Express server = "' + address.cyan 
                + '" Family= "' + family.cyan
                + '" listening on ' + bind.cyan );
        },
        default: () => console.log( '\n' )
    };

    (outputs[ outputMode.toLowerCase() ] || outputs[ 'default' ])();
}
