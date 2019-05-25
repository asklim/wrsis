const request = require('request');

const dataset = require('../../../sample-datasets/procurement');
const {procurementPeriods: period} = require('../../../../config/enumvalues');

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

const { PORT, NODE_ENV } = process.env;
const apiServer = NODE_ENV === 'production' ?
  'https://getting-mean-loc8r.herokuapp.com'
  : `http://localhost:${PORT}`;


const fetchDataSet = ( hostname, weekId, callback ) => 
{
  if( hostname && hostname !== '' ) {
    const reqOptions = {
      url : `${hostname}/api/sum/weeknatural/${weekId}`,
      method : "GET",
      json : {},
      qs : {},
    };
    request( 
      reqOptions,
      ( err, res, resBody ) => {  // '{..., body:[{}, ..., {}]}' 
        if(err) {
          callback( err, null);
          return;   
        }
        const maxFrequency = 2;
        //console.log('body: ', resBody);
        //Преобразование в Procurement DataSet        
        callback( null, 
          resBody.body
          .map( item => {
            item.sp = needUnitsForPeriod( item, period.short );
            item.mp = needUnitsForPeriod( item, period.middle );
            item.lp = needUnitsForPeriod( item, period.long );
            item.xlp = needUnitsForPeriod( item, period.xtraLong );            
            delete item.valid;
            delete item.fqA;
            delete item.fqM;
            return item;
          })
          .filter( item => item.xlp[maxFrequency] > 0 )             
          // Товар на xtraLong период по максимальным продажам не нужен
          // Не включаем в датасет.
          // Клиент получает только те позиции которые нужны на закупку
        );
    });
  } else {
    // Тестовый датасет если hostname=''
    callback( null, dataset );
  }
};


/** 
 * Read a procurement dataset by the week id 
 * GET /api/sum/procurements/:weekId 
 **/
const readOne = (req, res) =>
{
  console.log('ROne: Finding procurement`s params: ', req.params);
  console.log('ROne: Finding procurement`s query: ', req.query);
  //console.log(`hostname is ${req.hostname}`);
  
  const { weekId } = req.params;  
  if (req.params && weekId) 
  {
    fetchDataSet( apiServer, // ''
      weekId,
      (err, data) =>
      {
        if (err) {
          //console.log(err);
          sendJSONresponse(res, 404, err);
          return;
        } 
        if (!data) {
          sendJSONresponse(res, 404, {
            message : `data for week ${weekId} not found.`
          });
          return;
        }       
        sendJSONresponse(res, 200, data);
      });
  } 
  else {
    console.log('No week.Id specified.');
    sendJSONresponse(res, 400, {
      message : 'No week.Id in request.'
    });
  }
};


module.exports = {
  readOne,
  //create,
  //updateOne,
  //deleteOne,
};