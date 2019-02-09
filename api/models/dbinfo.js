//var mongoose = require('mongoose');
//var conn = mongoose.connection;

/**
 * iDb - mongoose.connection to MongoDB
 */

module.exports.log = function(iDb) {
  
  //console.log('dbinfo: Mongoose version %s', mongoose.version);

  //console.log('dbinfo: %s:%s', iDb.host, iDb.port);
  var title = `dbinfo: ${iDb.host}:${iDb.port}`;

/*  console.log(`${title}: collection's count = %d`, 
                 Object.keys(iDb.collections).length);
  console.log(`${title}: model's count = ${iDb.modelNames().length}`);  
  console.log(`${title}: `, iDb.modelNames());
  */

  var infoArr = [];
  let models = iDb.modelNames(); //массив имен моделей

  models.forEach( mdlName => {
    
    infoArr.push(mdlName);
    let mdl = iDb.model(mdlName);    
    //infoArr.push(mdl.estimatedDocumentCount({}));

    mdl.countDocuments({}, function(err, count) {     
      infoArr.push( count );
      //console.log(`${title}: In ${mdlName} model ${count} items.`);
    });  
  });
  
  setTimeout(function() {console.log(`${title}: `, infoArr);}, 1500);

/*  Object.keys(iDb.collections).forEach(key => {
    let coll = iDb.collection(key);
    coll.countDocuments({}, function(err, count) {
      console.log(`${title}: In ${key} collection ${count} items.`);
    });     
  });
*/
};