const serverConfig = require( './serverconfig' );
//const httpResponses = require( './http-responses' ); 
//const consoleLogger = require( './logger' );
const helpers = require( 'asklim' );

module.exports = {
    ... serverConfig,
    //... httpResponses,
    //consoleLogger,
    ... helpers,
};
