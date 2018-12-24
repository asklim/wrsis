var mongoose = require('mongoose');
var SPlace = mongoose.model('SalePlace');

console.log('dbinfo: Mongoose version %s', mongoose.version);

//console.log("dbinfo:");
//console.log(SPlace.db);

SPlace.countDocuments({}, function(err, count) {
  console.log('dbinfo: In salePlaces collection %d items.', count);
});

/*
SPlace.find({ PlaceID : '10611' }).exec(function(err, place) {
  console.log("Item One :");
  console.log( place );
});
//*/

