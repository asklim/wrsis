var mongoose = require('mongoose');

var salePlaceSchema = new mongoose.Schema({
          _id: {type: String, required: true},
       'rec#': {type: Number, required: true, min: 1},
         Name: {type: String, required: true},
     FullName: {type: String, required: true},
         Moll: {type: Number, required: true},
        Floor: {type: Number, required: true},
       Sector: {type: Number, required: true},
         Line: {type: Number, required: true},
        Place: {type: Number, required: true},
      Address: {type: String, required: true},
  Description: {type: String},
        Notes: {type: String},
         Host: {type: String, required: true},
  ModifiedDateTime: {type: Date, 'default': Date.now}
});

mongoose.model('SalePlace', salePlaceSchema, 'salePlaces'); 
// last arg - collection`s name in MongoDB