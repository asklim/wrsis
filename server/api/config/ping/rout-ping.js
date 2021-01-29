
const { 
    //icwd ,
    callbackError400,
    callbackError405,
    //sendJSONresponse,
} = require( '../../../helpers/serverconfig' );

const ctrlPing = require( './ctrl-ping' );


/**  
 * Read a env variable from process.env by name
 * GET /api/config/ping/app
 * GET /api/config/ping/mongosum
 * GET /api/config/ping/mongocfg
 */
module.exports = function ( router ) {

    router.all( '/config/ping/', callbackError400 );

    let pingPath = '/config/ping/:pingId';
    
    router.get( pingPath, ctrlPing.readOne );
    router.post( pingPath, callbackError405 );
    router.put( pingPath, callbackError405 );
    router.delete( pingPath, callbackError405 );
  
};

