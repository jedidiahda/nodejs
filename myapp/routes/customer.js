const express       = require('express');
const router        = express.Router();
const account       = require('./account.js');
const customer      = require('../data/customer_data')();

router.get('/', account.restrict, (req, res, next) => {
    customer.fetch_all({})
        .then(result => res.render('customer-list', {
            customers: result,
            title: 'Customers found ' + result.length
        }));
});

router.get('/create', account.restrict, (req, res, next) => {
    res.render('customer', { title: 'Add new customer' });
});

router.post('/create', account.restrict, (req, res, next) => {
    //res.send(req.body);
    customer.save(req.body).then(result => {
        res.send(result);
    });
});

router.get('/edit/:id', account.restrict, (req, res, next) => {
    res.send(req.params)
});


module.exports = router;