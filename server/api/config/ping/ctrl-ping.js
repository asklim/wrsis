
const { 
    icwd,
    consoleLogger ,
    send200Ok,
    send400BadRequest,
    send503ServiceUnavailable,
} = require( '../../../helpers' );

const log = consoleLogger( 'ctrl-PING:' );

let dbcfg = require( `${icwd}/server/databases` ).getDB( 'config' );
const Agent = dbcfg.model( 'Agent' );

let dbsum = require( `${icwd}/server/databases` ).getDB( 'sum' );
const WeekNatural = dbsum.model( 'WeekNatural' );



/** 
 * Read a env variable from process.env by name
 * GET /api/config/ping/app
 * @returns send 200 {message : 'app'} - is Ok or nothing if app doesn't work  
 * 
 * GET /api/config/ping/mongocfg
 * GET /api/config/ping/mongosum
 * @returns send 200 {message : 'nn'} - count of docs.   
 * @returns send 404 {message : '-1'} - no Mongo
 **/

module.exports.readOne = (req, res) => {

    //params : {'app' | 'mongo'}
    log.info( 
        'readOne - params:', req && req.params,
        'count:', req && req.params && Object.keys( req.params ).length 
    );

    if( !req || !req.params ) { 
        return send400BadRequest( res, 'No .params in request.' );        
    }
    if( Object.keys( req.params ).length === 0) { // должно быть    
        return send400BadRequest( res, ".params is empty." );        
    }

    const { pingId } = req.params;

    if( !pingId ) {  // req.params.* должен быть    
        return send400BadRequest( res, ".pingId not present" );             
    }

    const ticker = pingId.toLowerCase();

    if( ticker === 'app' ) {  
        return send200Ok( res, 'app' );        
    }

    if( ticker === 'mongocfg' ) {
        return Agent
        .countDocuments( {}, 
            (err,count) => {
                if( err ) {
                    return send503ServiceUnavailable( res, '-1' );                
                }            
                return send200Ok( res, count.toString() );                  
            }
        );        
    }

    if( ticker === 'mongosum' ) {
        return WeekNatural
        .countDocuments( {}, 
            (err,count) => {
                if( err ) {
                    return send503ServiceUnavailable( res, '-1' );                   
                }            
                return send200Ok( res, count.toString() );                      
            }
        );        
    }

    send400BadRequest( res );
};
