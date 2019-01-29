//var mongoose = require('mongoose');
//var Catalog = mongoose.model('Catalog');

var sendJSONresponse = function (res, status, content) {
  res.status(status);
  res.json(content);
};


module.exports.catalogWithQuery = function (req, res) {
  
  let coffeeTea = [{GID: 2019011001, 
                   Group: 6,
                   Name: 'WebItem'
                  }];
  console.log(coffeeTea);
  sendJSONresponse(res, 200, coffeeTea);
};

