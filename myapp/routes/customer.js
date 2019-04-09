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
    customer.save(req.body).then(result => {
        res.send(result);
    });
});

router.get('/edit', account.restrict, (req, res, next) => {
    res.render('customer', { 
        title: 'Edit customer',
        data: {},
    });
});

router.get('/edit/:id', account.restrict, (req, res, next) => {
    customer.fetch_one({
        id: req.params.id
    }).then(result => {
        if(result.error){
            res.send(result.error);
        }else{
            res.render('customer', { 
                title: 'Edit customer',
                data: result,
            });
        }
    });
});

router.post('/delete', account.restrict, (req, res, next) => {
    next();
});

router.post('/delete/:id', account.restrict, (req, res, next) => {
    customer.delete({
        id: req.params.id
    }).then(result => res.send(result));
});


module.exports = router;