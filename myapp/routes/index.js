const express = require('express');
const router = express.Router();
const account = require('./account.js');


/* GET home page. */
router.get('/',account.restrict, function(req, res, next) {
  res.render('index', { title: 'Expresslida' });
});

module.exports = router;
