"use strict";
var db = require('../databases/databases').getDB('config');
var Agent = db.model('Agent');


const sendJSONresponse = (res, status, content) => 
{
  logAgents(content);
  res.status(status);
  res.json(content);
};

/**
 * 
 * @param {*} content - может быть
 *        one object - если возврат одного элемента
 *  array of objects - если возврат всех элементов
 *   array of string - если возврат списка types, groups or ids
 *  
 */
function logAgents(content) 
{
  //console.log(`${typeof(content)}`); // object
  if (Array.isArray(content)) 
  {
    if (content.length>0)
    {
      if (typeof content[0] === 'object')
      {
        const shortAgents = content.map( 
          (agent) => {
            let { id, type, group } = agent;
            return {          
              id,
              type,
              group
            };
        });
        console.log(`agents[{},{}]:`);
        console.log(shortAgents);
      }
      else {
        console.log(`agent [array]:`);
        console.log( content );
      }
    }
    else {
      console.log(`agent [empty]:`);
      console.log( content );      
    }
  }
  else {
    console.log(`agent {object}:`);
    console.log( content );
  }
}


/** 
 * Read a agent info by the id 
 * GET /api/config/agents/:agentId 
 **/
module.exports.readOne = (req, res) =>
{
  console.log('ROne: Finding agent`s params: ', req.params);
  console.log('ROne: Finding agent`s query: ', req.query);
  console.log(req.hostname);
  
  const { agentId } = req.params;
  if (req.params && agentId) 
  {
    Agent.findOne( 
      {id: agentId},
      (err, agent) =>
      {
        if (!agent) {
          sendJSONresponse(res, 404, {
            'message': 'agent.Id not found'
          });
          return;
        } else if (err) {
          //console.log(err);
          sendJSONresponse(res, 404, err);
          return;
        }        
        sendJSONresponse(res, 200, agent);
      });
  } 
  else {
    console.log('No agent.Id specified');
    sendJSONresponse(res, 404, {
      'message': 'No agent.Id in request'
    });
  }
};


/** 
 * Create a new agent 
 * POST /api/config/agents 
 */
module.exports.create = (req, res)  =>
{
  //console.log(req.body);
  Agent.create( 
    req.body, 
    (err, agent) => 
    {
      if (err) {
        //console.log(err);
        sendJSONresponse(res, 400, err);
      } 
      else {
        sendJSONresponse(res, 201, agent);
      }
  });
};


/** 
 * Update agent
 * PUT /api/config/agents/:agentId 
 */
module.exports.updateOne = (req, res) =>
{
  //console.log(req.body);
  const { agentId } = req.params;
  if (!agentId) 
  {
    sendJSONresponse(res, 404, {
      'message': 'Not found, agent.id is required'
    });
    return;
  }

  Agent.findOne(
    {id: agentId},
    (err, agent) =>
    {
      if (!agent) {
        sendJSONresponse(res, 404, {
          'message': 'agent.id not found'
        });
        return;
      } 
      else if (err) {
        sendJSONresponse(res, 400, err);
        return;
      }

      Object.assign(agent, req.body);
      //agent.host = req.body.host;

      agent.save( (err, agent) =>
      {
        if (err) {
          sendJSONresponse(res, 404, err);
        } else {
          sendJSONresponse(res, 200, agent);
        }
      });
  });
};      


/** 
 *DELETE /api/config/agents/:agentId 
 */
module.exports.deleteOne = (req, res) =>
{
  const { agentId } = req.params;
  if (agentId) 
  {
    Agent.findOneAndDelete(
      {id: agentId},
      (err) =>
      { 
        if (err) {
          console.log(err);
          sendJSONresponse(res, 404, err);
          return;
        }
        console.log('Agent id ' + agentId + ' deleted');
        sendJSONresponse(res, 204, null);
    });
  } 
  else {
    sendJSONresponse(res, 404, {
      'message': 'No agent.id'
    });
  }
};


/** 
 * Read a list of all agents
 * GET /api/config/agents 
 */
module.exports.readListAll = (req, res) =>
{
  console.log('LAll: Finding agent`s params: ', req.params);
  console.log('LAll: Finding agent`s query: ', req.query);
  if (req.params) 
  { //={}
    let propName;
    let projection;
    const projections = {
      'types': {type: 1},
      'groups': {group: 1},
      'ids' : {id: 1}
    };    
    if (req.query && Object.keys(req.query).length != 0) {
      propName = Object.keys(req.query)[0];
      projection = projections[propName] || '';
    }
    else {
      projection = '';
    }    
    console.log('projection: ', projection);

    Agent
    .find({}, // all agents
      projection,
      (err, agents) =>
      {
        if (!agents) {
          sendJSONresponse(res, 404, {
            'message': 'agents not found'
          });
          return;
        } 
        else if (err) {
          console.log(err);
          sendJSONresponse(res, 404, err);
          return;
        }

        if (propName && propName !=='') 
        {         
          let docs;
          switch (propName.toLowerCase()) 
          {
            case 'types':
              docs = uniqueValue( agents, 'type');
              break;
            case 'groups':
              docs = uniqueValue( agents, 'group');
              break;
            case 'ids':
              docs = uniqueValue( agents, 'id');
              break;
          }
          sendJSONresponse(res, 200, docs);
        }
        else {  
          sendJSONresponse(res, 200, agents);
          return;
        }
    });   
  } 
  else {
    console.log('No params for all-list specified');
    sendJSONresponse(res, 404, {
      'message': 'No all-list params in request'
    });
  }
};


function uniqueValue( arr, propName ) 
{
  let arrSet = new Set();
  arr.forEach( elem => {arrSet.add(elem[propName]);});
  let result = [];
  arrSet.forEach( elem => {result.push(elem);});
  return result;
}
