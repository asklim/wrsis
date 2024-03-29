/**
 * iDb - mongoose.connection to MongoDB
 */

module.exports.log = function(iDb) {
  
    //console.log('dbinfo: Mongoose version %s', mongoose.version);

    var title = `dbinfo: ${iDb.host}:${iDb.port}/${iDb.db.databaseName}`;
  
    /*  console.log(`${title}: collection's count = %d`, 
                 Object.keys(iDb.collections).length);
  console.log(`${title}: model's count = ${iDb.modelNames().length}`);  
  console.log(`${title}: `, iDb.modelNames());
  */

    var callArr = [];
    let models = iDb.modelNames(); //массив имен моделей

    models
  .forEach( modelName => {   
      let mdl = iDb.model( modelName );
      callArr.push( 
          mdl.countDocuments( {}, (err, count) => count )
      );  
  });

    Promise.all( callArr )
  .then( docsCounts => {  
      console.log( `${title}: `, models, docsCounts );
  })
  .catch( error => console.log( error.message ));
};
