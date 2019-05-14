
const ctrlEnvVariable = require('../../controllers/processenv');

const sendError405 = (req, res) => {
  // Метод запроса не разрешен к использованию для данного URL
  res.status(405);
  res.json({});
};


/**  
 * api for 1 agent: /api/config/agents/<agentId>. 
 */
module.exports = function ( router ) {

  let envPath = '/config/processenv';
  
  router.get(envPath, ctrlEnvVariable.readOne);
  router.post(envPath, sendError405);
  router.put(envPath, sendError405);
  router.delete(envPath, sendError405);
  
};

