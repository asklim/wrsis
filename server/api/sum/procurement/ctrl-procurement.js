const request = require('request');
const chalk = require('react-dev-utils/chalk');
const icwd = require('fs').realpathSync(process.cwd());

//const icwd = process.env.INIT_CWD; // НЕ РАБОТАЕТ на Heroku: undefined
console.log(chalk.red('INIT_CWD is ', icwd)); // = '/app'

const dataset = require(`${icwd}/server/sample-datasets/procurement`);
const { procurementPeriods : period } = require(`${icwd}/src/config/enumvalues`);
const { needUnitsForPeriod } = require(`${icwd}/src/lib/utils/rsis`);

const sendJSONresponse = (res, status, content) => {
  res.status(status);
  res.json(content);
};

const { PORT, NODE_ENV } = process.env;
const apiServer = NODE_ENV === 'production' ?
  'https://rsis-webapp.herokuapp.com'
  : `http://localhost:${PORT}`;


const fetchDataSet = ( hostname, weekId, callback ) => 
{
  console.log(chalk.green('ctrl-procurement: fetchDataset start'));
  if( hostname && hostname !== '' ) {
    const reqOptions = {
      url : `${hostname}/api/sum/weeknatural/${weekId}`,
      method : "GET",
      headers : {
        "Cache-Control" : "no-cache, no-store"
      },
      json : {},
      qs : {},
    };    
    request( 
      reqOptions,
      (err, res, resBody) =>  // '{..., body:[{}, ..., {}]}' 
      {  
        console.log(chalk.green('ctrl-procurement: week-natural data got up.'));
        if(err) {
          callback( err, null);
          return;   
        }
        const maxFreqIndex = 2;
  console.log(chalk.green(
    'ctrl-procurement: convert week-natural-body to procurement dataset.'))
  ;
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
          .filter( item => item.xlp[maxFreqIndex] > 0 )             
          // Товар на xtraLong период по максимальным продажам не нужен, =0
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
  console.log(chalk.green(
    'ROne: Finding procurement`s params: ', req.params, '\n',
    'ROne: Finding procurement`s query: ', req.query
  ));
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