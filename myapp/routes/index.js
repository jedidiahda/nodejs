var express = require('express');
var router = express.Router();
var account = require('./account.js');


/* GET home page. */
router.get('/',account.restrict, function(req, res, next) {
  res.render('index', { title: 'Expresslida' });
});

module.exports = router;
