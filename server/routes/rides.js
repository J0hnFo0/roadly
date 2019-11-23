const express = require('express');
const router = express.Router();

const Customer = require('../models/Customer');

// JS calculates week days like so: Sunday - Saturday : 0 - 6

// GET Rides for current day
router.get('/', (req, res, next) => {
  Customer.find()
    .then(customers => {

      customers.map((x) => {
        startDate = new Date(x.startDate);
        console.log("start",startDate)
        x.pickUpDate = startDate.setDate(startDate.getDate() + 7);
        console.log("pick up",new Date(x.pickUpDate));
      })
   
      res.json({
        sucess: true,
        customers
      })

    })
    .catch(err => next(err));
});

// GET Rides based on duration choosen by user

module.exports = router;