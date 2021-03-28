
//const { icwd } = require( './serverconfig' );
const HTTP = require( `./http-response-codes` );

/**
 * Send content as 'object' ONLY.
 * @param {*} res 
 * @param {*} status 
 * @param {*} content 
 */
function sendJSONresponse (res, status, content = 'response') {

    let response = ( typeof content === 'object' ) ? content : { 'message': content };
    res.status( status );
    res.json( response );
}


function send200Ok (res, msg = 'OK') {
    sendJSONresponse( res, HTTP.OK, msg );
}

function send201Created (res, msg = 'CREATED') {
    sendJSONresponse( res, HTTP.CREATED, msg );
}

function send204NoContent (res, msg = 'NO_CONTENT') {
    sendJSONresponse( res, HTTP.NO_CONTENT, msg );
}

function send400BadRequest (res, msg = 'BAD_REQUEST (invalid syntax)') {
    sendJSONresponse( res, HTTP.BAD_REQUEST, msg );
}

function send404NotFound (res, msg = 'NOT_FOUND') {
    sendJSONresponse( res, HTTP.NOT_FOUND, msg );
}

// Метод запроса не разрешен к использованию для данного URL
const send405MethodNotAllowed = (res, msg = 'METHOD_NOT_ALLOWED') =>    
    sendJSONresponse( res, 
        HTTP.METHOD_NOT_ALLOWED, 
        { message: msg } 
    )
;

function send409Conflict (res, msg = 'CONFLICT') {
    sendJSONresponse( res, HTTP.CONFLICT, msg );
}

function send500ServerError (res, msg = 'INTERNAL_SERVER_ERROR') {
    sendJSONresponse( res, HTTP.INTERNAL_SERVER_ERROR, msg );
}

const send503ServiceUnavailable = (res, msg = 'SERVICE_UNAVAILABLE') =>    
    sendJSONresponse( res, 
        HTTP.SERVICE_UNAVAILABLE, 
        { message: msg } 
    )
;


const callbackError400 = (req, res) => send400BadRequest( res, 'callbackE400' );
const callbackError405 = (req, res) => send405MethodNotAllowed( res, 'callbackE405' );


module.exports = {

    sendJSONresponse,

    send200Ok,
    send201Created,
    send204NoContent,
    send400BadRequest,
    send404NotFound,
    send405MethodNotAllowed,
    send409Conflict,
    send500ServerError,
    send503ServiceUnavailable,

    callbackError400,
    callbackError405,
};
