const d = require('debug')('api:sum:procurement');
const axios = require('axios');
const {
    icwd,
    consoleLogger,
    //sendJSONresponse,
    //send200Ok,
    send400BadRequest,
    send404NotFound,
    send200Ok,
} = require('../../../helpers');

const log = consoleLogger('ctrl-SUM:');

//const HTTP = require( `${icwd}/server/helpers/http-response-codes` );

const { procurementPeriods: period } = require(`${icwd}/src/config/enum-values`);
const { needUnitsForPeriod } = require(`${icwd}/src/lib/rsis`);

const SAMPLE_DATASET_FNAME = `${icwd}/server/sample-datasets/procurement`;


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


async function makeProcurementDataSet (
    hostname,
    weekId
) {
    d('ctrl-: fetchDataset start');
    log.info('try get ProcurementDataSet from', hostname );

    if( !hostname ) {
        // Тестовый датасет если hostname=''
        const sampleDataset = require( SAMPLE_DATASET_FNAME );
        return sampleDataset;
    }

    const data = await axios({
        url: `${hostname}/api/sum/weeknatural/${weekId}`,
        method: "GET",
        headers: {
            "Cache-Control": "no-cache, no-store"
        },
    });
    d('ctrl-: week-natural data got: %d items', data.length );

    const result = data.
        map( convertToProcurement ).
        filter( onlyItemsXtraLongGTZero )
        // Клиент получает только те позиции которые нужны на закупку
        // на xtraLong период
        // т.e. хотя-бы один элемент больше 0, => их сумма >0, а не [0,0,0]
    ;
    d('ctrl-: converted week-natural-body to procurement dataset.');

    return result;
}


/**
 * Read a procurement dataset by the week id
 * GET /api/sum/procurements/:weekId
 **/
const readOne = async (req, res) => {

    if( !req.params ) {
        return send400BadRequest( res, 'No .params in request.');
    }

    console.log(
        `\nreadOne: Finding procurement's params:`, req.params,
        `\nreadOne: Finding procurement's query :`, req.query
    );
    d(`hostname is ${req.hostname}`);

    const { weekId } = req.params;
    if( !weekId ) {
        log.error('procurement.readOne: No week.Id specified.');
        return send400BadRequest( res, 'No week.Id in request.');
    }

    d('readOne: before fetch Dataset ...');

    const { API_SERVER } = process.env;
    const apiServer = !API_SERVER
        ? req.hostname
        : API_SERVER;        //'https://rsis-webapp.herokuapp.com'

    try {
        const data = await makeProcurementDataSet( apiServer, weekId );
        if( !data ) {
            return send404NotFound( res, `data for week ${weekId} not found.`);
        }
        send200Ok( res, data );
    }
    catch (err) {
        if( err ) {
            //console.log(err);
            return send400BadRequest( res, err );
        }
    }
};

module.exports = {
    readOne,
    //create,
    //updateOne,
    //deleteOne,
};
