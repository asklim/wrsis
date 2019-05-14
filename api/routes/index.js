//const express = require('express');
//import express from 'express';
//const router = express.Router();

const router = require('express').Router();

require('./config/processenv')( router );

require('./auth')( router );

require('./config/catalogs')( router );

require('./config/agents')( router );

router.get('/*', 
  (req, res) => {
     res.status(400);
     res.json({message: "Bad request"});
});

/*
const { setSaleplacesRoutes } = require('./config/saleplaces');
setSaleplacesRoutes( router );

const { setStaffersRoutes } = require('./config/staffers');
setStaffersRoutes( router );
*/

module.exports = router;
