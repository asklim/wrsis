//var debug = require( 'debug' )( 'api:sum:weeknatural' );
const { 
    icwd, 
    consoleLogger,
    //sendJSONresponse,
    send200Ok,
    send201Created,
    send204NoContent,
    send400BadRequest,
    send404NotFound,
    send409Conflict,
    send500ServerError,
} = require( '../../../helpers' );

const log = consoleLogger( 'ctrl-SUM:' );

const db = require( `${icwd}/server/databases` ).getDB( 'sum' );
const WeekNatural = db.model( 'WeekNatural' );


/** 
 * @name readOne
 * @description 
 * Read a week summary Natural info 
 * by the XXI century weekId or 'last' 
 * @fires 200 OK          & document
 * @fires 400 Bad Request & message
 * @fires 404 Not Found   & message
 * @fires 500 Server Error & error object
 * @returns {} undefined
 * @template
 * GET /api/sum/weeknatural/:weekId
 * @example 
 * GET /api/sum/weeknatural/960
 * GET /api/sum/weeknatural/1011
 * GET /api/sum/weeknatural/last 
 *
 * 
**/
const readOne = (req, res) => {


    console.log( 
        `I: try readOne sum-week-natural document`,
        `\nI: finding weekNatural's params:`, req.params,
        `\nI: finding weekNatural's query :`, req.query
    );
    
    const { weekId } = req.params;

    if( !req.params || !weekId ) {

        log.warn( 'weekNatural.readOne: No weekId specified.' );
        return send400BadRequest( res, 'No weekId in request.' );        
    }

    let finding, sorting, weekNumber;

    if( weekId.toLowerCase() === 'last' ) {
        
        finding = {};
        sorting = { id: -1 };
    }
    else {

        weekNumber = Number.parseInt( weekId, 10 );
        if( !weekNumber ) {

            log.warn( 'weekNatural.readOne: wrong weekId specified.' );
            return send400BadRequest( res, 'Wrong weekId in request.' );            
        }

        finding =  { id: weekNumber };
        sorting =  {};            
    }


    WeekNatural
        .find( finding )
        .sort( sorting )
        .limit(1)
        .exec( (err, docs) => {

            if( !docs || docs.length < 1 ) {

                let msg = `Summary data for week ${weekId}/${weekNumber} not found.`;
                log.warn( `weekNatural ${msg}` );

                return send404NotFound( res, `WeekNatural ${msg}` );                
            }

            if( err ) {                 
                //console.log(err);                
                return send500ServerError( res, err );
            } 

            log.info( `SUCCESS: weekNatural ${docs[0].id} readOne is Ok.`);
            return send200Ok( res, docs[0] );
        });
};



/** 
 * @name create
 * @description Create a new week Natural
 * @fires 201 Created     & message
 * @fires 400 Bad Request & message
 * @fires 409 Conflict    & message
 * @fires 500 Server Error & error object
 * @returns {} undefined
 * @example
 * POST /api/sum/weeknatural
 * 
 *  
**/
const create = (req, res)  => {


    log.info( `try create, sum-week-natural body.id: ${req.body.id}` ); 
    
    if( !req.body || req.body === {} ) {
        
        return send400BadRequest( res, 'Bad request, body is required' );
    }

    const { id } = req.body;

    if( !id /*|| weekId === ''*/ ) {

        return send400BadRequest( res, 'Bad request, body.id number is required' );
    }  
  
    const finding = { id };

    WeekNatural
        .find( finding )
        .limit( 1 )
        .exec( (err, docs) => { 

            if( err ) {                 
                //console.log(err);
                return send500ServerError( res, err );
            }

            if( docs && docs.length !== 0 ) {

                return send409Conflict( res, 
                    `Summary data for week ${id} already exists.` 
                );
            }

            WeekNatural.create( 
                req.body, 
                (err, doc) => {

                    if( err ) {

                        log.error( 'weekNatural.create err: ', err );
                        return send500ServerError( res, err );                        
                    } 

                    log.info( `SUCCESS: weekNatural ${doc.id} created.`);
                    return send201Created( res, 
                        `Summary data for week ${doc.id} created successfull.`
                    );                    
                });
        });    
};



/** 
 * @name updateOne
 * @description Update week Natural summary 
 * @fires 200 OK          & updated document
 * @fires 400 Bad Request & message
 * @fires 404 Not Found   & message
 * @fires 500 Server Error & error object
 * @returns {} undefined
 * @example
 * PUT /api/sum/weeknatural
 * 
 *  
**/
const updateOne = ( req, res ) => {


    //console.log(req.body);

    if( !req.body || req.body === {} ) {
        return send400BadRequest( res, 'Bad request, body is required' );
    }

    const weekNumber  = Number.parseInt( req.body.id, 10 );

    if( !weekNumber ) {    
        return send400BadRequest( res, 'Bad request, body.id is required or wrong.' );
    }

    WeekNatural
        .find( { id: weekNumber } )
        .limit( 1 )
        .exec( (err, docs) => {

            if( !docs || docs.length < 1 ) {
                return send404NotFound( res, 
                    `Summary data for week ${weekNumber} not found.` 
                );
            }

            if( err ) {                
                //console.log(err);
                return send500ServerError( res, err );
            }
    
            Object.assign( 
                docs[0], 
                req.body,
                { updatedAt: Date.now() }
            );
            //doc[0].host = req.body.host;
            //debug( `weekNatural doc.isNew: ${docs[0].isNew}.`);//false

            docs[0].save( (err, savedDoc) => {

                if( err ) {
                    return send500ServerError( res, err );
                }

                log.info( `SUCCESS: weekNatural ${savedDoc.id} updated.` );
                return send200Ok( res, savedDoc );                
            });
        });
};   


/** 
 * @name deleteOne
 * @description Delete week Natural summary
 * @fires 204 No Content  & deleted document
 * @fires 400 Bad Request & message
 * @fires 404 Not Found   & null
 * @fires 500 Server Error & error object
 * @returns {} undefined
 * @template
 * DELETE /api/sum/weeknatural/:weekId 
 * @example
 * DELETE /api/sum/weeknatural/956
 * DELETE /api/sum/weeknatural/1011
 *  
**/
const deleteOne = (req, res) => {


    const { weekId } = req.params;

    if( !weekId || weekId === '' ) {
        return send400BadRequest( res, 'Bad request, weekId is required.' );
    }

    const weekNumber  = Number.parseInt( weekId, 10 );
    
    if( !weekNumber ) {
        log.warn( `weekNatural.deleteOne: bad parameter <:weekId> specified.` );
        return send400BadRequest( res, 'Bad parameter <:weekId> in request.' );        
    }

    WeekNatural.findOneAndDelete( 
        { id: weekNumber },
        (err, doc) => { 

            if( err ) {
                log.error( err );
                return send500ServerError( res, err );
            }
            
            if( !doc ) {
                return send404NotFound( res, doc );
            }

            log.info( `Week ${weekId} natural summary deleted.` );
            return send204NoContent( res, doc );
        });  
};


module.exports = {

    readOne,
    create,
    updateOne,
    deleteOne,
};
