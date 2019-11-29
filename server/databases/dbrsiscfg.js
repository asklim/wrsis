const util = require( 'util' );
const connection = require( './createConn' );
const { 
  dbName,
  mongoURI,
} = require( '../helpers/serverconfig' );
const { rsiscfg: databaseName } = dbName;

const title = 'rsis.cfg';
let uri = ( process.env.NODE_ENV === 'production' ) ?
  util.format( mongoURI.CLOUDDB_TEMPLATE,
    process.env.ATLAS_CREDENTIALS,
    databaseName 
  )
  : `${ process.env.MONGO_DEV2 || mongoURI.DEV2 }/${databaseName}`;    
  //'mongodb://hp8710w:27016/rsiscfg';     

const db = connection.createConn( uri, title );    
      

// BRING IN YOUR SCHEMAS & MODELS

const agentSchema = require( '../models/agents' );
db.model( 'Agent', agentSchema, 'agents' ); 

const userSchema = require( '../models/users' );
db.model( 'User', userSchema, 'users' ); 

const idMappingSchema = require( '../models/catalogs' ).idMappingExcel;
db.model( 'IdMappingExcel', idMappingSchema, 'catalogs' ); 


module.exports = db;


//const salePlaceSchema = require('../models/saleplaces');
//db.model('SalePlace', salePlaceSchema, 'salePlaces'); 
// last arg - collection`s name in MongoDB

//const stafferSchema = require('../models/staffers');
//db.model('Staffer', stafferSchema, 'staffers'); 
// last arg - collection`s name in MongoDB
