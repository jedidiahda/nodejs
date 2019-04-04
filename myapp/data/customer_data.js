const utils         = require('../common/utils')();

function CustomerData(){
    return{
        fetch_all: (variables) => {
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
        },
        fetch_one: (variables) => {
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
        },
        /**
         * save customer to db, picture will do on update
         */
        save: (variables) => {
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
        },
        update: () => {

        }
    }
}

module.exports = CustomerData;