var mongoose = require('mongoose');
var intraDbShutdown;
//var dbURI = 'mongodb://localhost/rsiscfg';


var dbURIIntra = process.env.DBCFG_STANDALONE_URI;
//var dbURIIntra = 'mongodb://localhost:36667/rsiscfg';

var conn = mongoose.createConnection(dbURIIntra, { useNewUrlParser: true,
                                                   useCreateIndex : true });

// CONNECTION EVENTS
conn.on('connected', function() {
    console.log('intraDB.cfg: Mongoose connected to ' + dbURIIntra);
});
conn.on('error', function(err) {
    console.log('intraDB.cfg: Mongoose connection error: ' + err);
});
conn.on('disconnected', function() {
    console.log('intraDB.cfg: Mongoose disconnected');
});

// CAPTURE APP TERMINATION / RESTART EVENTS
// To be called when process is restarted or terminated
intraDbShutdown = function(msg, callback) {
    conn.close(function() {
        console.log('intraDB.cfg: Mongoose disconnected through ' + msg);
        callback();
    });
};
// For nodemon restarts
process.once('SIGUSR2', function() {
    intraDbShutdown('nodemon restart', function() {
        process.kill(process.pid, 'SIGUSR2');
    });
});
// For app termination
process.on('SIGINT', function() {
    intraDbShutdown('app termination', function() {
        process.exit(0);
    });
});
// For Heroku app termination
process.on('SIGTERM', function() {
    intraDbShutdown('Heroku app termination', function() {
        process.exit(0);
    });
});

// BRING IN YOUR SCHEMAS & MODELS
