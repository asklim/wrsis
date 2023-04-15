const createError = require( 'http-errors' );
const express = require( 'express' );
const session = require('express-session');
const path = require( 'path' );
const cors = require( 'cors' );
const favicon = require( 'serve-favicon' );
// const cookieParser = require( 'cookie-parser' );
const morganLogger = require( 'morgan' );
const colors = require( 'colors' );
//const inspect = require( 'object-inspect' );

const {
    icwd,
    consoleLogger
} = require('./helpers');

const log = consoleLogger( 'appSrvr:' );

const { NODE_ENV, DEV_MODE, } = process.env;


const isProduction = NODE_ENV === 'production';
const isHMR = DEV_MODE === 'HotModuleReplacement';

const passport = require('passport');  //passport must be before dbs-models

const {
    createConns,
    databasesShutdown,
} = require('./databases');

createConns();


const { PWD, } = process.env;
console.log( colors.red( 'package.json dir is ', icwd )); // = '/app'
console.log( colors.red( `PWD (${__filename}) is ${PWD}` ));

const app = express();
const apiRouter = require( './routes/api-router.js' );

// view engine setup
app.set( 'views', path.join( `${icwd}/server/views` ));
app.set( 'view engine', 'ejs');

app.use( '*', cors() );

// app.use( cookieParser() );

app.use( express.static( `${icwd}/dist` ));

app.use( express.urlencoded( {
    extended: true,
    limit: "5mb",
}));


const sess = {
    secret: 'rsis web app',
    resave: false,
    saveUninitialized: true,
    cookie: {}
};
if( isProduction ) {
    app.set('trust proxy', 1 ); // trust first proxy
    // sess.resave = false;
    // sess.saveUninitialized = true;
    sess.cookie.secure = true; // serve secure cookies
}
app.use(session(sess));


app.use( passport.initialize() );
app.use( passport.session() );
require('./passport.js'); //after db create models

// uncomment after placing your favicon in /public
app.use( favicon(`${icwd}/public/favicon.ico`));

let loggerTemplate = [
    '[:date[web]]', ':status',
    //':remote-addr', ':remote-user',
    ':method :url :response-time[0] ms - :res[content-length]'
].join(' ');
app.use( morganLogger( loggerTemplate ));

// IMPORTANT!!! Должен быть перед express.json()
const { bot: mikaVitebskViberBot } = require( './viber-bot' );
const viberBotMiddleware = mikaVitebskViberBot.middleware();
app.use( '/viber/mikavitebsk',
    function (req, res, next) {

        let originalSig = req.headers['x-viber-content-signature'];
        //req.query.sig = originalSig;
        req.headers.X_Viber_Content_Signature = originalSig;

        console.log(
            'viber-bot-middleware request:',
            '\nreq.query', req.query,
            '\nreq.headers', req.headers,
            '\nreq.body', req.body
            //inspect( req, { depth: 2, indent: 4 } )
        );
        try {
            viberBotMiddleware( req, res, next );
        }
        catch (err) {
            console.log( 'viberBotMiddleware error:\n', err );
        }
    }
);

app.use( express.json( {
    limit: "5mb",
}));

app.use( '/api', apiRouter );


if( !isProduction && isHMR ) {

    const webpack = require( 'webpack' );
    const webpackConfig = require( `${icwd}/config/webpack.devhmr` );
    const webpackDevMiddleware = require( 'webpack-dev-middleware' );

    const compiler = webpack( webpackConfig );

    const wdmOption = {
        publicPath: webpackConfig.output.publicPath,
    };
    console.log( 'webpack-dev-middleware (wdm) config: ', wdmOption );

    app.use( webpackDevMiddleware( compiler, wdmOption ));
    app.use( require( 'webpack-hot-middleware' )( compiler, {
        path: '/__webpack_hmr',
        heartbeat: 10 * 1000,
    }));
}

app.get('*', (req, res, next) => {

    //console.log( inspect( _req, { depth: 2, indent: 4 } ));

    log.info(`server-app dirname is ${__dirname}` );
    log.info('req.user:', req.user );
    res.sendFile(
        path.resolve(`${icwd}/dist/index.html`),
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

    res.status( err.status || 500 );
});


module.exports = {
    app,
    databasesShutdown,
    isProduction,
    viberBot: mikaVitebskViberBot,
};
