//import { mongoose } from 'mongoose';
const mongoose = require( 'mongoose' );
const infoDB = require( './infodb' );


module.exports.createConn = function(uri, title) {

  const connection = mongoose.createConnection( uri, { 
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true, 
  });
  const { host, port } = connection;

  // CONNECTION EVENTS
  connection.on( 'connected', () => {
    console.log( `${title}: connected to ${host}:${port}` );
    infoDB.log( connection );
  });
  connection.on( 'error', err => {
    console.log( title, ': connection error: ', err );
  });
  connection.on( 'disconnecting', () => {
    console.log( `${title} connection closing ...` );
  });  
  connection.on( 'disconnected', () => {
    console.log( `${title} disconnected from MongoDB.` );
  });
  connection.on( 'close', () => {
    console.log(`${title} connection closed.` );
  });

  connection.closeConn = () => {
    return new Promise( (resolve) => 
      connection.close( () => resolve( title ))
    );
  };

  return connection;
};
