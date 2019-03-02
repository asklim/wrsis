'use strict';
var conn = require('./dbconnect');
//debug/statistic info for Mongo DB


let title = 'rsis.cfg';

var db;
var uri;

switch (process.env.NODE_ENV) {
  
  case 'production': 
    uri = process.env.CLOUDDB_CFG_URI;
    /*var dbURI = 'mongodb://<user>:<pass>@'+
    'rsis-shard-00-00-jjwdj.mongodb.net:27017,'+
    'rsis-shard-00-01-jjwdj.mongodb.net:27017,'+
    'rsis-shard-00-02-jjwdj.mongodb.net:27017/rsiscfg?ssl=true&'+
    'replicaSet=rsis-shard-0&authSource=admin&retryWrites=true';
    */
    break;

  case 'intranet':
    uri = process.env.MONGO_STANDALONE_URI+'/rsiscfg';
    //var dbURI = 'mongodb://localhost:36667/rsiscfg';      
    break;

  default:
    uri = process.env.MONGO_DEV1_URI+'/rsiscfg';
     //var dbURI = 'mongodb://localhost:27017/rsiscfg';    
}      

db = conn.createConn(uri, title);    
      

// BRING IN YOUR SCHEMAS & MODELS

var salePlaceSchema = require('../../api/models/saleplaces');
db.model('SalePlace', salePlaceSchema, 'salePlaces'); 
// last arg - collection`s name in MongoDB

var stafferSchema = require('../../api/models/staffers');
db.model('Staffer', stafferSchema, 'staffers'); 
// last arg - collection`s name in MongoDB

var idMappingSchema = require('../../api/models/catalogs').idMappingExcel;
db.model('IdMappingExcel', idMappingSchema, 'catalogs'); 

module.exports = db;