const express = require('express');
const router = express.Router();

const Customer = require('../models/Customer');

// JS calculates week days from: Sunday - Saturday : 0 - 6

// GET Rides for current day
router.get('/', (req, res, next) => {
  Customer.find()
    .then(customers => {

      let list = [];

      const currentDate = new Date()
      let startDate;
      let pickUpDate;

      customers.forEach((x, i) => {
        startDate = new Date(x.startDate)

        pickUpDate = new Date(
          x.startDate.setDate(
            x.startDate.getDate() + x.interval * 7
          )
        )

        console.log("start", i, startDate, "pick", pickUpDate, "current", currentDate)

      })

      res.json({
        sucess: true,
      })

    })
    .catch(err => next(err));
});

// GET Rides based on duration choosen by user

module.exports = router;