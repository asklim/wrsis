var express = require('express');
var router = express.Router();
var ctrlSalePlaces = require('../controllers/saleplaces');

/* GET home page. */
router.get('/', function(req, res) { //, next) {
  res.render('index', { title: 'Express' });
});

/* GET saleplaces page. */
router.get('/saleplaces', ctrlSalePlaces.saleplacesAllList);

module.exports = router;
