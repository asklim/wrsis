const express = require('express');
//import express from 'express';
const router = express.Router();

const ctrlAgents = require('../controllers/agents');
const ctrlSaleplaces = require('../controllers/saleplaces');
const ctrlStaffers = require('../controllers/staffers');
const ctrlCatalogs = require('../controllers/catalogs');
const ctrlCatalogExcel = require('../controllers/catalogs4excel');
const ctrlCatalogWeb = require('../controllers/catalogs4web');

/**  
  * api for Excel Catalogs: /api/config/catalogs/excel. 
  * */
const catalogs = '/config/catalogs';
const catalogExcel = catalogs+'/excel';
 
router.get(catalogExcel, ctrlCatalogExcel.catalogReadOne);
router.post(catalogExcel, ctrlCatalogExcel.catalogCreateOne);
router.put(catalogExcel, ctrlCatalogExcel.catalogUpdateOne);
router.delete(catalogExcel, ctrlCatalogExcel.catalogDeleteOne); 

/**  
  * api for Web Catalogs: /api/config/catalogs/web
  * */
const catalogWeb = catalogs+'/web';
  
router.get(catalogWeb, ctrlCatalogWeb.catalogReadOne);
 
/*  get all catalogs (list?) */
router.get(catalogs, ctrlCatalogs.catalogsAllClients);



/**  
 * api for 1 agent: /api/config/agents/<agentId>. 
 */
 const agents = '/config/agents';
 const agentId = agents+'/:agentId';
 
 router.get(agentId, ctrlAgents.readOne);
 router.post(agents, ctrlAgents.create);
 router.put(agentId, ctrlAgents.updateOne);
 router.delete(agentId, ctrlAgents.deleteOne);
 
 /* api for all agents */
 router.get(agents, ctrlAgents.readListAll);




/**  
  * api for 1 saleplace: /api/saleplaces/<placeId>. 
  * */
const places = '/config/saleplaces';
const placeId = places+'/:placeId';

router.get(placeId, ctrlSaleplaces.saleplaceReadOne);
router.post(places, ctrlSaleplaces.saleplaceCreate);
router.put(placeId, ctrlSaleplaces.saleplaceUpdateOne);
router.delete(placeId, ctrlSaleplaces.saleplaceDeleteOne);

/* api for all saleplaces */
router.get(places, ctrlSaleplaces.saleplacesListAll);


/**  
  * api for 1 staffer: /api/staffers/<stafferId>. 
  * */

const staffers = '/config/staffers';
const stafferId = staffers + '/:stafferId';

router.get(stafferId, ctrlStaffers.stafferReadOne);
router.post(staffers, ctrlStaffers.stafferCreate);
router.put(stafferId, ctrlStaffers.stafferUpdateOne);
router.delete(stafferId, ctrlStaffers.stafferDeleteOne);

/* api for all staffers */
router.get(staffers, ctrlStaffers.staffersListAll);

module.exports = router;
