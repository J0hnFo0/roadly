const mongoose = require('mongoose');
const Customer = require('../models/Customer');

const dbName = 'roadly-db';
mongoose.connect(`mongodb://localhost/${dbName}`);

const firstCustomers = [
    {   
        company: 'Die Mannschaft GmbH',
        name: {
            first: 'Lothar',
            last: 'Mätthaus',
        },
        customerNumber: 123,
        adress: {
            street: 'Finkenweg',
            number: 7,
            city: 'Hamburg',
            zipcode: 0815,
        },
        pitSize: 12,
        startDate: '2019-11-11 09:51:43.000',
        interval: 1,
        tavArea: 789,
        notes: 'This is a test customer, seeded by the Seeds that Christian seeded.',
    },
    {
        company: 'Die Öffentlich-Rechtlichen GmbH',
        name: {
            first: 'Gundula',
            last: 'Gause',
        },
        customerNumber: 123,
        adress: {
            street: 'Tagestehmenstreet',
            number: 8,
            city: 'Berlin',
            zipcode: 0815,
        },
        pitSize: 12,
        interval: 1,
        startDate: '2019-11-20 09:51:43.000',
        tavArea: 789,
        notes: 'This is a test customer, seeded by the Seeds that Christian seeded.',
    },
    {
        company: 'Ducktales Gesellschaft für Quack mbH',
        name: {
            first: 'Donald',
            last: 'Duck',
        },
        customerNumber: 123,
        adress: {
            street: 'Somestreet',
            number: 1,
            city: 'Entenhause',
            zipcode: 0815,
        },
        pitSize: 12,
        interval: 1,
        startDate: '2019-10-20 09:51:43.000',
        tavArea: 789,
        notes: 'This is a test customer, seeded by the Seeds that Christian seeded.',
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