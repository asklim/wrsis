const createError = require( 'http-errors' );
const express = require( 'express' );
const path = require( 'path' );
const cors = require( 'cors' );
const favicon = require( 'serve-favicon' );
const cookieParser = require( 'cookie-parser' );
//const bodyParser = require( 'body-parser' );
const morganLogger = require( 'morgan' );
const { icwd } = require( './helpers/serverconfig' );
const colors = require( 'colors' );

const isProduction = process.env.NODE_ENV === 'production';
const webpack = isProduction ? null : require( 'webpack' );
const configFactory = isProduction ? null : require(`${icwd}/config/wdmNodeHMR.config`);
const webpackDevMiddleware = isProduction ? null : require('webpack-dev-middleware');

const log = require( './helpers/logger')('appSrvr:');

const passport = require( 'passport' );  //passport must be before dbs-models

const { 
    createConns,
    databasesShutdown, } = require( './databases' );

createConns();

require( './passport.js' ); //after db create models

let { PWD, } = process.env;
console.log( colors.red( 'package.json dir is ', icwd )); // = '/app'
console.log( colors.red( `PWD (${__filename}) is ${PWD}` ));

const app = express();
const apiRouter = require( './routes/api-router.js' );

// view engine setup
app.set( 'views', path.join( `${icwd}/server/views` ));
app.set( 'view engine', 'ejs');

app.use( passport.initialize() );

// uncomment after placing your favicon in /public
app.use( favicon( `${icwd}/public/favicon.ico` ));

app.use( cors() );

app.use( morganLogger( 'dev' ));
app.use( express.json( {
    limit: "5mb",
}));

app.use( express.urlencoded( { 
    extended: true,
    limit: "5mb",
}));

app.use( cookieParser() );

app.use( express.static( `${icwd}/static` ));


app.use( '/api', apiRouter );

const mikaVitebskViberBot = require( './viber-bot' );
const viberBotMiddleware = mikaVitebskViberBot.middleware();
app.use( '/viber/mikavitebsk', 
    function (req, res, next) {
        console.log( 'viber-bot-middleware request:\n', req );
        viberBotMiddleware( req, res, next ); 
    }
);

if( !isProduction ) {
    const webpackConfig = configFactory( 'development' );
    const compiler = webpack( webpackConfig );
    const wdmOption = {
        loglevel: 'debug', //'info' - default
        publicPath: webpackConfig.output.publicPath,
    };
    console.log( 'webpack-dev-middleware (wdm) config: ', wdmOption );
    app.use( webpackDevMiddleware( compiler, wdmOption ));
    app.use( require( 'webpack-hot-middleware' )( compiler, {
        path: '/__webpack_hmr',
        heartbeat: 10 * 1000,
    }));
}

app.get('*', (_req, res, next) => {

    log.info( `server-app dirname is ${__dirname}` );
    res.sendFile( 
        path.resolve( `${icwd}/static/index.html` ),
        (err) => { 
            if( err ) next( err ); 
        }
    );
});

// catch 404 and forward to error handler
app.use( (req, res, next) => {
    next( createError( 404 ), req, res );
});

// ***************   error handler   **************************

// eslint-disable-next-line no-unused-vars
app.use( (err, req, res, _next) => {     
    // must be 4 args

    let runMode = req.app.get( 'env' );
    const isDev = runMode === 'development';
    log.info( 
        `error-handler: env='${runMode}'`,
        '\nreq.body = ', req.body,
        '\nerror = ', err 
    );

    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = isDev ? err : {};

    // render the error page
    res.status( err.status || 500 );
    res.render( 'error', { 
        message: 'Last Error Handler',
        error: err,
    });
});

module.exports = {

    app,
    databasesShutdown,
    viberBot: mikaVitebskViberBot,
};
