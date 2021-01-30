
const { 
    callbackError405,
} = require( '../../helpers' );

const { readOne } = require( './ctrl-processenv' );


/**  
 * Read a env variable from process.env by name
 * GET /api/config/processenv?name=<var_name> 
 */
module.exports = function ( router ) {

    let envPath = '/config/processenv';
    
    router.get( envPath, readOne );
    router.post( envPath, callbackError405 );
    router.put( envPath, callbackError405 );
    router.delete( envPath, callbackError405 );
  
};

