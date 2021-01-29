const icwd = require( '../../helpers/serverconfig' );
const log = require( '../../helpers/logger')('ctrl-ENV:');
const HTTP = require(`${icwd}/src/config/http-response-codes`);

const sendJSONresponse = (res, status, content) => {
    res.status( status );
    res.json( content );
};

const response400 = (res, msg) => {
    // Bad Request (invalid syntax)
    sendJSONresponse( res, HTTP.BAD_REQUEST, { message: msg } );
};

/** 
 * Read a env variable from process.env by name
 * GET /api/config/processenv?name=<var_name> 
 **/
module.exports.readOne = (req, res) => {

    log.info( 
        'readOne - params:', req && req.params,
        'count:', req && req.params && Object.keys( req.params ).length 
    );
    log.info( 'readOne - req.query: ', req && req.query );  

    const count = req && req.params
        ? Object.keys( req.params ).length
        : 0
    ;   
    if( count !== 0) { // не должно быть
    
        response400( res, ".params not allowed" );
        return;
    }
    if( !req.query ) // req.query должен быть
    {     
        response400( res, ".query not present" );
        return;    
    }
    
    const { name } = req.query;
    if( !name ) { // req.query.name должен быть
    
        response400( res, ".name not present" );
        return;      
    }
    
    const value = process.env[ name ];
    
    log.info( `name: ${name} value:`, value );

    if( !value ) { // Нет такой переменной в окружении
    
        sendJSONresponse( res, HTTP.NOT_FOUND, {
            message: "invalid .name"
        });
        return;      
    }
    sendJSONresponse( res, HTTP.OK, {
        value,
    });
};
