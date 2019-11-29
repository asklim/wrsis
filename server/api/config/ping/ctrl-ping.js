const icwd = require( 'fs' ).realpathSync( process.cwd() );
const HTTP = require(`${icwd}/src/config/httpResponseCodes`);
let db;
db = require( `${icwd}/server/databases` ).getDB( 'config' );
const Agent = db.model( 'Agent' );
db = require( `${icwd}/server/databases` ).getDB( 'sum' );
const WeekNatural = db.model( 'WeekNatural' );

const sendJSONresponse 
= (res, status, content) => {
  res.status( status );
  res.json( content );
};

const response400 
= (res, msg = 'Bad Request (invalid syntax)') => {
  // 400 Bad Request (invalid syntax)
  sendJSONresponse( res, HTTP.BAD_REQUEST, { message: msg } );
};

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

module.exports.readOne = (req, res) =>
{
  //params : {'app' | 'mongo'}
  console.log( 'ctrl-ping.ROne: Finding params: ', req.params,
               ' count: ', Object.keys(req.params).length );
  //console.log('env.ROne: Finding query: ', req.query);  

  if( !req.params ) { 
    response400( res, 'No .params in request.' );
    return;
  }
  if( Object.keys( req.params ).length === 0) // должно быть
  {    
    response400( res, ".params is empty." );
    return;
  }

  const { pingId } = req.params;
  if( !pingId ) // req.params.* должен быть
  {    
    response400( res, ".pingId not present" );
    return;      
  }

  if( pingId.toLowerCase() === 'app' ) {    
    sendJSONresponse( res, 200, { message: 'app' } );
    return;      
  }

  if( pingId.toLowerCase() === 'mongocfg' ) {
    Agent.countDocuments( {}, (err,count) => {
      if( err ) {
        sendJSONresponse( res, HTTP.SERVICE_UNAVAILABLE,
          { message: '-1' });
        return;
      }            
      sendJSONresponse( res, HTTP.OK, { message: count.toString() });
      return;      
    });
    return;
  }

  if( pingId.toLowerCase() === 'mongosum' ) {
    WeekNatural.countDocuments( {}, (err,count) => {
      if( err ) {
        sendJSONresponse( res, HTTP.SERVICE_UNAVAILABLE,
          { message: '-1' });
        return;
      }            
      sendJSONresponse( res, HTTP.OK, { message: count.toString() });
      return;      
    });
    return;
  }

  response400( res );
};
