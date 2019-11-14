const util = require('util');
const connection = require( './createConn' );
const { 
  dbName,
  mongoURI } = require( '../helpers/serverconfig' );

const { rsissum : databaseName } = dbName;  
const title = 'rsis.sum';

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
    //'mongodb://hp8710w:27016/rsissum';     
}
const db = connection.createConn(uri, title);    
      

// BRING IN YOUR SCHEMAS & MODELS

const weekNaturalSchema = require('../api/sum/weeknatural/schm-weeknatural');
db.model('WeekNatural', weekNaturalSchema, 'weekNatural'); 
// last arg - collection`s name in MongoDB

/*
var stafferSchema = require('./staffers');
db.model('Staffer', stafferSchema, 'staffers'); 
// last arg - collection`s name in MongoDB
*/


module.exports = db;