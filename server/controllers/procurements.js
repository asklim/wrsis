
const dataset = require('../sample-datasets/procurement');
const {procurementPeriods: period} = require('../../config/enumvalues');

const sendJSONresponse = (res, status, content) =>
{
  //console.log('sendJSON: ', content);
  //console.log('sendJSON: ', Object.keys(content[0]));
  res.status(status);
  res.json(content);
};

const needUnitsForPeriod = (item, period) => {
  let count;
  count = period*item.fqL - item.frAct;
  let last = count < 0 ? 0 : 1 + Math.trunc(count/item.qpu);
  count = period*item.fqA - item.frAct;
  let avrg = count < 0 ? 0 : 1 + Math.trunc(count/item.qpu);
  count = period*item.fqM - item.frAct;
  let max = count < 0 ? 0 : 1 + Math.trunc(count/item.qpu);  
  return [ last, avrg, max ];
};

const fetchDataSet = ( hostname, weekId, callback ) => 
{
  if( hostname && hostname !== '' ) {
    let route = `${hostname}:${process.env.PORT}`; 
    route += `/api/sum/weeknatural/${weekId}`;
    fetch( route )
      .then( response => response.json() )  // '[{}, ..., {}]'      
      .then( rawData => {  
        //Преобразование в Procurement DataSet
        return rawData.map( item => {
          item.sp = needUnitsForPeriod( item, period.short );
          item.mp = needUnitsForPeriod( item, period.middle );
          item.lp = needUnitsForPeriod( item, period.long );
          item.xlp = needUnitsForPeriod( item, period.xtraLong );
          delete item.valid;
          delete item.fqA;
          delete item.fqM;
          return item;
        });
      })
      .then( procurementDataset => {
        callback( null, procurementDataset );
      })
      .catch(err => {
        console.log(err); 
        callback( err, null);
      })      
    ;
  } else {
    callback( null, dataset );
  }
};


/** 
 * Read a procurement dataset by the week id 
 * GET /api/sum/procurements/:weekId 
 **/
module.exports.readOne = (req, res) =>
{
  console.log('ROne: Finding procurement`s params: ', req.params);
  console.log('ROne: Finding procurement`s query: ', req.query);
  console.log(`hostname is ${req.hostname}`);
  
  const { weekId } = req.params;  
  if (req.params && weekId) 
  {
    const week = weekId === 'last' ? 959 : weekId;
    fetchDataSet( '', //req.hostname,
      week,
      (err, data) =>
      {
        if (err) {
          //console.log(err);
          sendJSONresponse(res, 404, err);
          return;
        } 
        if (!data) {
          sendJSONresponse(res, 404, {
            'message': `data for week ${weekId} not found`
          });
          return;
        }       
        sendJSONresponse(res, 200, data);
      });
  } 
  else {
    console.log('No week.Id specified');
    sendJSONresponse(res, 404, {
      'message': 'No week.Id in request'
    });
  }
};