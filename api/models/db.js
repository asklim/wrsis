var mongoose = require('mongoose');
var gracefulShutdown;
//var dbURI = 'mongodb://localhost/rsiscfg';
//var dbURI = 'mongodb+srv://asklim:kas2rsis@rsis-jjwdj.'+
//            'mongodb.net/rsiscfg?retryWrites=true';

var dbURI = process.env.DBCFG_DEV_URI;
//var dbURI = process.env.MONGO_CLOUD_URI;
/*var dbURI = 'mongodb://asklim:kas2rsis@'+
'rsis-shard-00-00-jjwdj.mongodb.net:27017,'+
'rsis-shard-00-01-jjwdj.mongodb.net:27017,'+
'rsis-shard-00-02-jjwdj.mongodb.net:27017/rsiscfg?ssl=true&'+
'replicaSet=rsis-shard-0&authSource=admin&retryWrites=true';
*/

if (process.env.NODE_ENV === 'production') {
    dbURI = process.env.DBCFG_CLOUD_URI;
}

mongoose.connect(dbURI, { useNewUrlParser: true,
                          useCreateIndex : true });

// CONNECTION EVENTS
mongoose.connection.on('connected', function() {
    console.log('Mongoose connected to ' + dbURI);
});
mongoose.connection.on('error', function(err) {
    console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function() {
    console.log('Mongoose disconnected');
});

// CAPTURE APP TERMINATION / RESTART EVENTS
// To be called when process is restarted or terminated
gracefulShutdown = function(msg, callback) {
    mongoose.connection.close(function() {
        console.log('Mongoose disconnected through ' + msg);
        callback();
    });
};
// For nodemon restarts
process.once('SIGUSR2', function() {
    gracefulShutdown('nodemon restart', function() {
        process.kill(process.pid, 'SIGUSR2');
    });
});
// For app termination
process.on('SIGINT', function() {
    gracefulShutdown('app termination', function() {
        process.exit(0);
    });
});
// For Heroku app termination
process.on('SIGTERM', function() {
    gracefulShutdown('Heroku app termination', function() {
        process.exit(0);
    });
});

// BRING IN YOUR SCHEMAS & MODELS
//require('./locations');
//require('./users');

require('./saleplaces');
require('./staffers');

//debug/statistic info for Mongo DB
require('./dbinfo.js');