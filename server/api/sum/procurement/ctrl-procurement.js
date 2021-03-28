const debug = require( 'debug' )( 'api:sum:procurement' );
const request = require( 'request' );
const { 
    icwd, 
    consoleLogger,
    //sendJSONresponse,
    //send200Ok,
    send400BadRequest,
    send404NotFound,
    send200Ok,
} = require( '../../../helpers' );

const log = consoleLogger( 'ctrl-SUM:' );

//const HTTP = require( `${icwd}/server/helpers/http-response-codes` );

const { procurementPeriods: period } = require( `${icwd}/src/config/enum-values` );
const { needUnitsForPeriod } = require( `${icwd}/src/lib/rsis` );

const SAMPLE_DATASET_FNAME = `${icwd}/server/sample-datasets/procurement`;



function makeProcurementDataSet (hostname, weekId, callback) {


    const summa = (accum, current) => accum + current;
    const onlyItemsXtraLongGTZero = (item) => item.xlp.reduce( summa ) > 0;

    const convertToProcurement = (item) => {

        item.sp = needUnitsForPeriod( item, period.short );
        item.mp = needUnitsForPeriod( item, period.middle );
        item.lp = needUnitsForPeriod( item, period.long );
        item.xlp = needUnitsForPeriod( item, period.xtraLong );            
        delete item.valid;
        delete item.fqA;
        delete item.fqM;
        return item;
    };

    debug( 'ctrl-: fetchDataset start' );
    log.info( 'try get ProcurementDataSet from', hostname );

    if( !hostname ) {
        // Тестовый датасет если hostname=''
        return callback( null, require( SAMPLE_DATASET_FNAME ));               
    }

    const reqOptions = {
        url: `${hostname}/api/sum/weeknatural/${weekId}`,
        method: "GET",
        headers: {
            "Cache-Control": "no-cache, no-store"
        },
        json: {},
        qs: {},
    };    
    request( 
        reqOptions,
        (err, _res, resBody) => { // '{..., body:[{}, ..., {}]}' 
        
            if( err ) {
                return callback( err, null );                   
            }
            if( !resBody ) {
                return callback( null, null );                
            }

            debug( 'ctrl-: week-natural data got: %d items', resBody.body.length );
            debug( 'ctrl-: convert week-natural-body to procurement dataset.' );
            
            callback( null, 
                resBody.body
                .map( convertToProcurement )
                .filter( onlyItemsXtraLongGTZero ) 
                // Клиент получает только те позиции которые нужны на закупку
                // на xtraLong период
                // т.e. хотя-бы один элемент больше 0, => их сумма >0, а не [0,0,0]   
            );
        }); 
}


/** 
 * Read a procurement dataset by the week id 
 * GET /api/sum/procurements/:weekId 
 **/
const readOne = (req, res) => {

    if( !req.params ) { 
        return send400BadRequest( res, 'No .params in request.' );
    }

    console.log(
        `\nreadOne: Finding procurement's params:`, req.params,
        `\nreadOne: Finding procurement's query :`, req.query
    );
    debug(`hostname is ${req.hostname}`);
  
    const { weekId } = req.params;  
    if( !weekId ) { 
        log.error( 'procurement.readOne: No week.Id specified.' );
        return send400BadRequest( res, 'No week.Id in request.' );
    }

    debug('readOne: before fetch Dataset ...');

    const { API_SERVER } = process.env;
    const apiServer = !API_SERVER
        ? req.hostname 
        : API_SERVER;        //'https://rsis-webapp.herokuapp.com'

    makeProcurementDataSet( 
        apiServer, 
        weekId,
        (err, data) => {

            if( err ) {
                //console.log(err);
                return send400BadRequest( res, err );
            } 
            if( !data ) {
                return send404NotFound( res, `data for week ${weekId} not found.` );
            }     
              
            send200Ok( res, data );
        });
};

module.exports = {
    readOne,
    //create,
    //updateOne,
    //deleteOne,
};
