const util = require( 'util' );
const connection = require( './createConn' );
const { 
  dbName,
  mongoURI } = require( '../helpers/serverconfig' );

const { rsistmp : databaseName } = dbName;
let title = 'rsis.tmp';

let uri;
if( process.env.NODE_ENV === 'production' ) { 
  uri = util.format( 
    mongoURI.CLOUDDB_TEMPLATE,
    process.env.ATLAS_CREDENTIALS,
    databaseName );
} else {  
  uri = ( !process.env.MONGO_DEV2 )
    ? mongoURI.DEV2 + '/' + databaseName
    : process.env.MONGO_DEV2 + '/' + databaseName;
    //'mongodb://hp8710w:27016/rsistmp';     
}
const db = connection.createConn( uri, title );    
      

// BRING IN YOUR SCHEMAS & MODELS

//const salePlaceSchema = require('../models/saleplaces');
//db.model('SalePlace', salePlaceSchema, 'salePlaces'); 
// last arg - collection`s name in MongoDB

//const stafferSchema = require('../models/staffers');
//db.model('Staffer', stafferSchema, 'staffers'); 
// last arg - collection`s name in MongoDB

//dbInfo.log(db);

module.exports = db;