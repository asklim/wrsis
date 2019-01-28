var webClient = require('./catalogs4Web');
var excelClient = require('./catalogs4Excel');

var sendJSONresponse = function (res, status, content) {
  console.log(`catalogs: ${content}`);
  res.status(status);
  res.json(content);
};

/** 
  * GET a one catalog for <client> by <query> 
  *
  **/

module.exports.catalogClientWithQuery = (req, res) => {

  console.log('req.params: ', req.params);
  console.log('req.query: ', req.query);

  if (req.params && req.params.client) {

    switch (req.params.client) {
      case 'excel':
        excelClient.catalogWithQuery(req, res);
        return;
      case 'web':
        webClient.catalogWithQuery(req, res);
        return; 
      default:
        sendJSONresponse(res, 404,
           {'catalogs': `Client '${req.params.client}' not found.`
        });
        return; 
    }
  } else {

    sendJSONresponse(res, 404, {
      'catalogs': 'No params in request.'
    });
  }
};

module.exports.catalogsAllClients = (req, res) => {

  console.log('req.params: ', req.params);
  console.log('req.query: ', req.query);

  sendJSONresponse(res, 404, {
    'catalogs': 'No params in request.'
  });
};
