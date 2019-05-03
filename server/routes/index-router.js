var express = require('express');
var router = express.Router();

/* GET login page. */
router.get('/', function(req, res) { //, next) {
  //res.render('index', { title: 'Express' });
  res.render('index', { title: 'rsis login' });
});

/* GET levelA home page. 
router.get('/levelA', function(req, res) { //, next) {
  res.render('index', { title: 'rsis - A level' });
});*/

module.exports = router;
