const express = require('express');
//import express from 'express';
const router = express.Router();


const { setAuthRoutes } = require('./auth');
setAuthRoutes( router );

const { setCatalogsRoutes } = require('./config/catalogs');
setCatalogsRoutes( router );

const { setAgentsRoutes } = require('./config/agents');
setAgentsRoutes( router );

const { setSaleplacesRoutes } = require('./config/saleplaces');
setSaleplacesRoutes( router );

const { setStaffersRoutes } = require('./config/staffers');
setStaffersRoutes( router );


module.exports = router;
