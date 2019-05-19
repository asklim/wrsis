const ctrlProcurements = require('../../controllers/procurements');

/**  
 * api for 1 week procurement: /api/sum/procurements/<weekId>. 
 */
module.exports = function ( router ) {

  let route = '/sum/procurements';
  let routeWithWeekId = route + '/:weekId';
  
  router.get(routeWithWeekId, ctrlProcurements.readOne);

};

