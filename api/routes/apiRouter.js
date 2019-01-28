var express = require('express');
var router = express.Router();

var ctrlSaleplaces = require('../controllers/saleplaces');
var ctrlStaffers = require('../controllers/staffers');
var ctrlCatalogs = require('../controllers/catalogs');


/**  
  * api for 1 saleplace: /api/saleplaces/<placeId>. 
  * */
 let catalogs = '/config/catalogs';
 let catalogClient = catalogs+'/:client';
 
 router.get(catalogClient, ctrlCatalogs.catalogClientWithQuery);
 router.get(catalogs, ctrlCatalogs.catalogsAllClients);
 
 
/**  
  * api for 1 saleplace: /api/saleplaces/<placeId>. 
  * */
let places = '/config/saleplaces';
let placeId = places+'/:placeId';

router.get(placeId, ctrlSaleplaces.saleplaceReadOne);
router.post(places, ctrlSaleplaces.saleplaceCreate);
router.put(placeId, ctrlSaleplaces.saleplaceUpdateOne);
router.delete(placeId, ctrlSaleplaces.saleplaceDeleteOne);

/* api for all saleplaces */
router.get(places, ctrlSaleplaces.saleplacesListAll);


/**  
  * api for 1 staffer: /api/staffers/<stafferId>. 
  * */

 let staffers = '/config/staffers';
 let stafferId = staffers + '/:stafferId';
 
 router.get(stafferId, ctrlStaffers.stafferReadOne);
 router.post(staffers, ctrlStaffers.stafferCreate);
 router.put(stafferId, ctrlStaffers.stafferUpdateOne);
 router.delete(stafferId, ctrlStaffers.stafferDeleteOne);
 
 /* api for all staffers */
 router.get(staffers, ctrlStaffers.staffersListAll);


module.exports = router;