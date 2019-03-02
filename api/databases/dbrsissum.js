'use strict';
var conn = require('./dbconnect');
//debug/statistic info for Mongo DB
//var dbInfo = require('./dbinfo');

let title = 'rsis.sum';

var db;
var uri;

switch (process.env.NODE_ENV) {
  
  case 'production': 
    uri = process.env.CLOUDDB_SUM_URI;
    break;

  case 'intranet':
    uri = process.env.MONGO_STANDALONE_URI+'/rsissum';
    //var dbURI = 'mongodb://localhost:36667/rsissum';  
    break;

  default:
    uri = process.env.MONGO_DEV2_URI+'/rsissum';
     //var dbURI = 'mongodb://localhost:27016/rsissum';    
}      

db = conn.createConn(uri, title);    
      

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