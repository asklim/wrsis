//var mongoose = require('mongoose');
//var Catalog = mongoose.model('Catalog');

var sendJSONresponse = function (res, status, content) {
  res.status(status);
  res.json(content);
};



module.exports.catalogWithQuery = function (req, res) {

  let xIDMapping = [{GID: 2019011001, LID: 2056}];
  console.log(xIDMapping);
  sendJSONresponse(res, 200, xIDMapping);
};

