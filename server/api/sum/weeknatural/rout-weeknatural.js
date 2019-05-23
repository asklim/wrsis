
const ctrlWeekNatural = require('./ctrl-weeknatural');

/**  
 * api for 1 week summary: /api/sum/weeknatural/<weekId>. 
 */
module.exports = function ( router ) {

  let route = '/sum/weeknatural';
  let routeWithWeekId = route + '/:weekId';
  
  router.get(routeWithWeekId, ctrlWeekNatural.readOne);
  router.post(route, ctrlWeekNatural.create);
  router.put(route, ctrlWeekNatural.updateOne);
  router.delete(routeWithWeekId, ctrlWeekNatural.deleteOne);
  
  /* api for all records */
  //router.get(route, ctrlWeekNatural.readListAll);
};

