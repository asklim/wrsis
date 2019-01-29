var request = require('request');
var apiOptions;

switch (process.env.NODE_ENV) {
  case 'production': 
    apiOptions = { server: 'https://rsis-webapp.herokuapp.com'};
    break;
  case 'intranet':
    apiOptions = { server : 'http://localhost:3666'};    
    break;
  default:
    apiOptions = { server : 'http://localhost:3006'};  
}


module.exports.saleplacesAllList = (req, res) => {
  getSaleplacesList(req, res, function(req, res, responseData) {
    renderSaleplacesPage(req, res, responseData);
  });  
};


var renderSaleplacesPage = function(req, res, spData) {
  res.render('saleplaces', { title: 'Sale places', list: spData});
};


var getSaleplacesList = function(req, res, callback) {

  var requestOptions, path;
  path = '/api/config/saleplaces/';
  requestOptions = {
    url : apiOptions.server + path,
    method : 'GET',
    json : {}
  };

  request(
    requestOptions,
    function(err, response, body) {
      var data = body;
      if (response.statusCode === 200) {       
        callback(req, res, data);
      } else {
        _showError(req, res, response.statusCode);
      }
    }
  );  
};


var _showError = function (req, res, status) {
  var title, content;
  if (status === 404) {
    title = '404, page not found';
    content = 'Oh dear. Looks like we can\'t find this page. Sorry.';
  } else if (status === 500) {
    title = '500, internal server error';
    content = 'How embarrassing. There\'s a problem with our server.';
  } else {
    title = status + ', something\'s gone wrong';
    content = 'Something, somewhere, has gone just a little bit wrong.';
  }
  res.status(status);
  res.render('generic-text', {
    title : title,
    content : content
  });
};