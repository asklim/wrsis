var mongoose = require('mongoose');
var SPlace = mongoose.model('SalePlace');
var Staffer = mongoose.model('Staffer');
var conn = mongoose.connection;

/**
 * iDb - mongoose.connection to intranet standalone MongoDB
 */
module.exports.log = function(iDb) {
  
  console.log('dbinfo: Mongoose version %s', mongoose.version);

  console.log('dbinfo: %s:%s', iDb.host, iDb.port);
  console.log(iDb.modelNames());
  //console.log(iDb.collections.count);
  console.log(iDb.collection('Staffer').count());

  console.log('dbinfo: %s:%s', conn.host, conn.port);
  console.log(conn.modelNames());
  //console.log(conn.collections.count);
  console.log(conn.collection('Staffer').count());

  SPlace.countDocuments({}, function(err, count) {
    console.log('dbinfo: In salePlaces collection %d items.', count);
  });
 
  /*
  SPlace.find({ PlaceID : '10611' }).exec(function(err, place) {
    console.log("Item One :");
    console.log( place );
  });
  //*/

  Staffer.countDocuments({}, function(err, count) {
    console.log('dbinfo: In staffers collection %d items.', count);
  });
};