'use strict';
var conn = require('./dbconnect');
//debug/statistic info for Mongo DB
//var dbInfo = require('./dbinfo');

let title = 'rsis.tmp';

var db;
var uri;

switch (process.env.NODE_ENV) {
  
  case 'production': 
    uri = process.env.CLOUDDB_TMP_URI;
    break;

  case 'intranet':
    uri = process.env.CLOUDDB_TMP_URI;     
    break;

  default:
    uri = process.env.MONGO_DEV2_URI+'/rsistmp';
     //var dbURI = 'mongodb://localhost:27016/rsistmp';    
}      

db = conn.createConn(uri, title);    
      

// BRING IN YOUR SCHEMAS & MODELS

var salePlaceSchema = require('../../api/models/saleplaces');
db.model('SalePlace', salePlaceSchema, 'salePlaces'); 
// last arg - collection`s name in MongoDB

var stafferSchema = require('../../api/models/staffers');
db.model('Staffer', stafferSchema, 'staffers'); 
// last arg - collection`s name in MongoDB

//dbInfo.log(db);

module.exports = db;