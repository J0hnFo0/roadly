const mongoose = require('mongoose');
const Customer = require('../models/customer');

const dbName = 'roadly-db';
mongoose.connect(`mongodb://localhost/${dbName}`);

const firstCustomers = [
    {
        company: 'Die Mannschaft GmbH',
        name: {
            first: 'Lothar',
            last: 'Mätthaus',
        },

        adress: {
            street: 'Finkenweg',
            number: 7,
            city: 'Hamburg',
            zipcode: 0815,
        },
        pitSize: 12,
        startDate: 2019 - 11 - 01,
        tav: 789,
        notes: 'This is a test customer, seeded by the Seeds that Christian created.',
    },
];

Customer.deleteMany()
    .then(() => Customer.create(firstCustomers))
    .then(() => {
        console.log('Customer db bootstrapped')
        mongoose.connection.close();
    })
    .catch(err => {
        throw err;
    });