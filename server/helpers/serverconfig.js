/* */
const icwd = require( 'fs' ).realpathSync( process.cwd() );
const HTTP = require( `${icwd}/src/config/http-response-codes` );

const dbName = {

    rsiscfg: "rsiscfg",
    rsistmp: "rsistmp",
    rsissum: "rsissum",
    //rsiswp: "rsiswp",
    //rsiswc: "rsiswc",
    //rsiswn: "rsiswn"
};

const mongoURI = {

    DEV1 : "mongodb://192.168.0.240:27017", // not used
    DEV2 : "mongodb://192.168.0.240:27016",
    CLOUDDB_TEMPLATE : "mongodb://%s@rsis-shard-00-00-jjwdj.mongodb.net:27017,rsis-shard-00-01-jjwdj.mongodb.net:27017,rsis-shard-00-02-jjwdj.mongodb.net:27017/%s?ssl=true&replicaSet=rsis-shard-0&authSource=admin&retryWrites=true",
};

let { PWD, DYNO } = process.env;
const isHeroku = DYNO && (PWD === '/app');



const sendJSONresponse = (res, status, content) => {
    res.status( status );
    res.json( content );
};


const sendError400 = (res, msg = 'Bad Request (invalid syntax)') => 
    sendJSONresponse( res, 
        HTTP.BAD_REQUEST, 
        { message: msg } 
    )
;

// Метод запроса не разрешен к использованию для данного URL
const sendError405 = (res, msg = 'METHOD_NOT_ALLOWED') =>    
    sendJSONresponse( res, 
        HTTP.METHOD_NOT_ALLOWED, 
        { message: msg } 
    )
;

const callbackError400 = (req, res) => sendError400( res );
const callbackError405 = (req, res) => sendError405( res );

module.exports = {
    dbName,
    mongoURI,
    isHeroku,
    icwd,
    sendJSONresponse,
    sendError400,
    sendError405,
    callbackError400,
    callbackError405,
};
