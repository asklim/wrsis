//var mongoose = require('mongoose');
//var SPlace = mongoose.model('SalePlace');
//var Staffer = mongoose.model('Staffer');
//var conn = mongoose.connection;

/**
 * iDb - mongoose.connection to intranet standalone MongoDB
 */
module.exports.log = function(iDb) {
  
  //console.log('dbinfo: Mongoose version %s', mongoose.version);

  console.log('dbinfo: %s:%s', iDb.host, iDb.port);
  console.log('dbinfo: collection`s count = %d', 
                 Object.keys(iDb.collections).length);
  console.log('dbinfo: model`s count = %d', iDb.modelNames().length);
  console.log(iDb.modelNames());
  
  iDb.modelNames().forEach(element => {
    let mdl = iDb.model(element);
    mdl.countDocuments({}, function(err, count) {
      console.log('dbinfo: In %s model %d items.', element, count);
    });  
  });
  
  Object.keys(iDb.collections).forEach(element => {
    let coll = iDb.collection(element);
    coll.countDocuments({}, function(err, count) {
      console.log('dbinfo: In %s collection %d items.', element, count);
    });     
  });


  /*
  SPlace.countDocuments({}, function(err, count) {
    console.log('dbinfo: In salePlaces collection %d items.', count);
  });
 
  /*
  SPlace.find({ PlaceID : '10611' }).exec(function(err, place) {
    console.log("Item One :");
    console.log( place );
  });
 

  Staffer.countDocuments({}, function(err, count) {
    console.log('dbinfo: In staffers collection %d items.', count);
  });*/
};