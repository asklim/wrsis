const log = require( '../../helpers/logger')('ctrl-PING:');
const icwd = require( '../../helpers/serverconfig' );
const HTTP = require(`${icwd}/src/config/http-response-codes`);

let db;

db = require( `${icwd}/server/databases` ).getDB( 'config' );
const Agent = db.model( 'Agent' );
db = require( `${icwd}/server/databases` ).getDB( 'sum' );
const WeekNatural = db.model( 'WeekNatural' );


const sendJSONresponse = (res, status, content) => {
    res.status( status );
    res.json( content );
};


const response400 = (res, msg = 'Bad Request (invalid syntax)') => 
    sendJSONresponse( res, 
        HTTP.BAD_REQUEST, 
        { message: msg } 
    )
;


/** 
 * Read a env variable from process.env by name
 * GET /api/config/ping/app
 * return 200 {message : 'app'} - is Ok or nothing if app doesn't work  
 * 
 * GET /api/config/ping/mongocfg
 * GET /api/config/ping/mongosum
 * return 200 {message : 'nn'} - count of docs.   
 * return 404 {message : '-1'} - no Mongo
 **/

module.exports.readOne = (req, res) => {

    //params : {'app' | 'mongo'}
    log.info( 
        'readOne - params:', req && req.params,
        'count:', req && req.params && Object.keys( req.params ).length 
    );

    if( !req || !req.params ) { 
        return response400( res, 'No .params in request.' );        
    }
    if( Object.keys( req.params ).length === 0) { // должно быть    
        return response400( res, ".params is empty." );        
    }

    const { pingId } = req.params;

    if( !pingId ) {  // req.params.* должен быть    
        return response400( res, ".pingId not present" );             
    }

    const ticker = pingId.toLowerCase();

    if( ticker === 'app' ) {  
        return sendJSONresponse( res, 
            HTTP.OK, 
            { message: 'app' } 
        );        
    }

    if( ticker === 'mongocfg' ) {
        return Agent
        .countDocuments( {}, 
            (err,count) => {
                if( err ) {
                    return sendJSONresponse( res, 
                        HTTP.SERVICE_UNAVAILABLE,
                        { message: '-1' }
                    );                
                }            
                return sendJSONresponse( res, 
                    HTTP.OK, 
                    { message: count.toString() }
                );                  
            }
        );        
    }

    if( ticker === 'mongosum' ) {
        return WeekNatural
        .countDocuments( {}, 
            (err,count) => {
                if( err ) {
                    return sendJSONresponse( res, 
                        HTTP.SERVICE_UNAVAILABLE,
                        { message: '-1' }
                    );                    
                }            
                return sendJSONresponse( res, 
                    HTTP.OK, 
                    { message: count.toString() }
                );                      
            }
        );        
    }

    response400( res );
};
