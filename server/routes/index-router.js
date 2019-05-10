//var express = require('express');
//var router = express.Router();
const router = require('express').Router();
const path = require('path');

/* GET login page. */
router.get('/', function(req, res) { //, next) {
  //res.render('index', { title: 'Express' });
  //res.render('index', { title: 'rsis login' });
  res.sendFile( path.resolve(
    __dirname, 
    '../../static',
    'index.html'
  ));
});

// GET for react app page. 
router.get('/*', (req, res) => {
  res.redirect('/');
});

module.exports = router;
