const express       = require('express');
const router        = express.Router();
const account       = require('./account.js');
const utils         = require('../common/utils')();

router.get('/', account.restrict, (req, res, next) => {
    getCustomers({})
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
    save(req.body).then(result => {
        res.send(result);
    });
});

router.get('/edit/:id', account.restrict, (req, res, next) => {
    res.send(req.params)
});

const getCustomers = (variables) => {
    return utils.gql({
        variables,
        query: `
            query{
                allCustomers{
                email
                firstName
                gender
                group
                id
                lastName
                phone
                picture
                }
            }
        `
    });
}

const getCustomer = (variables) => {
    return utils.gql({
        variables,
        query: `
            query{
                Customer(id:"1"){
                email
                firstName
                gender
                group
                lastName
                phone
                picture
                }
            }
        `
    });
}

//save customer to db, picture will be on update
const save = (variables) => {
    return utils.gql({
        variables,
        query: `
            mutation(
                $email:String!
                $firstName:String
                $gender:GenderEnum!
                $group:GroupEnum!
                $lastName:String!
                $phone:String!
            ){
                createCustomer(
                    email:$email
                    firstName:$firstName
                    lastName:$lastName
                    gender:$gender
                    group:$group
                    phone:$phone
                    picture:""
                ){
                    id
                }
            } 
        `
    });
}

module.exports = router;