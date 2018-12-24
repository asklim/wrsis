var express = require('express');
var router = express.Router();

var ctrlSalePlaces = require('../controllers/saleplaces');

/**  
  * api for 1 saleplace: /api/saleplaces/<placeId>. 
  * */

router.get('/saleplaces/:placeId', ctrlSalePlaces.salePlaceReadOne);
router.post('/saleplaces', ctrlSalePlaces.salePlaceCreate);
router.put('/saleplaces/:placeId', ctrlSalePlaces.salePlaceUpdateOne);
router.delete('/saleplaces/:placeId', ctrlSalePlaces.salePlaceDeleteOne);

/* api for all saleplaces */
router.get('/saleplaces', ctrlSalePlaces.salePlacesListAll);


module.exports = router;