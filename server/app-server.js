const createError = require( 'http-errors' );
const express = require( 'express' );
const path = require( 'path' );
const cors = require( 'cors' );
const favicon = require( 'serve-favicon' );
const cookieParser = require( 'cookie-parser' );
//const bodyParser = require( 'body-parser' );
const morganLogger = require( 'morgan' );
const icwd = require( 'fs' ).realpathSync( process.cwd());
const chalk = require( 'react-dev-utils/chalk' );

const isProduction = process.env.NODE_ENV === 'production';
const webpack = isProduction ? null : require( 'webpack' );
const configFactory = isProduction ? null : require(`${icwd}/config/wdmNodeHMR.config`);
const webpackDevMiddleware = isProduction ? null : require('webpack-dev-middleware');

const viberBot = require('./viber-bot');

const passport = require( 'passport' );  //passport must be before dbs-models
const { 
  createConns,
  databasesShutdown,
} = require( './databases' );
createConns();
require( './passport.js' ); //after db create models

let { PWD, } = process.env;
console.log( chalk.red( 'package.json dir is ', icwd )); // = '/app'
console.log( chalk.red( `PWD (${__filename}) is ${PWD}` ));

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


app.use('/api', apiRouter);
app.use('/viber/webhook', viberBot.middleware());

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

app.get('*', 
  (req, res, next) => {
    console.log( `server-app dirname is ${__dirname}` );
    res.sendFile( 
      path.resolve( `${icwd}/static/index.html` ),
      err => { if( err ) next( err ); }      
    );
});

// catch 404 and forward to error handler
app.use( (req, res, next) => {
    next(createError(404), req, res);
});

// error handler
// eslint-disable-next-line no-unused-vars
app.use( (err, req, res, next) => { 
    // must be 4 args
    let runMode = req.app.get( 'env' );
    const isDev = runMode === 'development';
    console.log(`app-server error-handler: env='${runMode}'`);
    console.log( isDev ? req.body : "");    

    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = isDev ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = {
  app,
  databasesShutdown,
  viberBot,
};
