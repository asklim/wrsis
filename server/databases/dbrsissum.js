//'use strict';
const util = require('util');

const { dbName } = require('../../config/enumvalues');
const conn = require('./dbconnect');

const title = 'rsis.sum';
let uri;

switch (process.env.NODE_ENV) {
  
  case 'production': 
    //uri = process.env.CLOUDDB_SUM_URI;
    uri = util.format(process.env.CLOUDDB_URI_TEMPLATE,
      process.env.ATLAS_CREDENTIALS,
      dbName.rsissum
    );
    break;

  case 'intranet':
    uri = process.env.MONGO_STANDALONE_URI+'/'+dbName.rsissum;
    //var dbURI = 'mongodb://localhost:36667/rsissum';  
    break;

  default:
    uri = process.env.MONGO_DEV2_URI+'/'+dbName.rsissum;
     //var dbURI = 'mongodb://localhost:27016/rsissum';    
}      

const db = conn.createConn(uri, title);    
      

// BRING IN YOUR SCHEMAS & MODELS
/*
var salePlaceSchema = require('./saleplaces');
db.model('SalePlace', salePlaceSchema, 'salePlaces'); 
// last arg - collection`s name in MongoDB

var stafferSchema = require('./staffers');
db.model('Staffer', stafferSchema, 'staffers'); 
// last arg - collection`s name in MongoDB
*/


module.exports = db;