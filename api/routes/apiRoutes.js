var express = require('express');
var router = express.Router();

var ctrlSalePlaces = require('../controllers/saleplaces');
var ctrlStaffers = require('../controllers/staffers');

/**  
  * api for 1 saleplace: /api/saleplaces/<placeId>. 
  * */

router.get('/saleplaces/:placeId', ctrlSalePlaces.salePlaceReadOne);
router.post('/saleplaces', ctrlSalePlaces.salePlaceCreate);
router.put('/saleplaces/:placeId', ctrlSalePlaces.salePlaceUpdateOne);
router.delete('/saleplaces/:placeId', ctrlSalePlaces.salePlaceDeleteOne);

/* api for all saleplaces */
router.get('/saleplaces', ctrlSalePlaces.salePlacesListAll);


/**  
  * api for 1 staffer: /api/staffers/<stafferId>. 
  * */

 router.get('/staffers/:stafferId', ctrlStaffers.stafferReadOne);
 router.post('/staffers', ctrlStaffers.stafferCreate);
 router.put('/staffers/:stafferId', ctrlStaffers.stafferUpdateOne);
 router.delete('/staffers/:stafferId', ctrlStaffers.stafferDeleteOne);
 
 /* api for all staffers */
 router.get('/staffers', ctrlStaffers.staffersListAll);


module.exports = router;