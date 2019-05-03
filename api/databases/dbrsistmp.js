//'use strict';
const util = require('util');

const { dbName } = require('../../config/enumvalues');
const conn = require('./dbconnect');

let title = 'rsis.tmp';
let uri = util.format(process.env.CLOUDDB_URI_TEMPLATE,
  process.env.ATLAS_CREDENTIALS,
  dbName.rsistmp
);

switch (process.env.NODE_ENV) {
  
  case 'production': 
    //uri = process.env.CLOUDDB_TMP_URI;
    break;

  case 'intranet':
    //uri = process.env.CLOUDDB_TMP_URI;     
    break;

  default:
    uri = process.env.MONGO_DEV2_URI+'/'+dbName.rsistmp;
     //var dbURI = 'mongodb://localhost:27016/rsistmp';    
}      

const db = conn.createConn(uri, title);    
      

// BRING IN YOUR SCHEMAS & MODELS

const salePlaceSchema = require('../../api/models/saleplaces');
db.model('SalePlace', salePlaceSchema, 'salePlaces'); 
// last arg - collection`s name in MongoDB

const stafferSchema = require('../../api/models/staffers');
db.model('Staffer', stafferSchema, 'staffers'); 
// last arg - collection`s name in MongoDB

//dbInfo.log(db);

module.exports = db;