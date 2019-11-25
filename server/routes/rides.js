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

/*       customers.forEach((x, i) => {
        startDate = new Date(x.startDate)

        pickUpDate = new Date(
          x.startDate.setDate(
            x.startDate.getDate() + x.interval * 7
          )
        )

              console.log( i, "start", startDate, "pick", pickUpDate, "current", currentDate)

      }) */

     let pickUpsPerYear = 365 / (customers[0].interval * 7)

      for (let i = 0; i < pickUpsPerYear; i++) {
        startDate  = customers[0].startDate;

        pickUpDate = new Date (
          customers[0].startDate.setDate(
            customers[0].startDate.getDate() + customers[0].interval * 7
          )
        )

        list.push(pickUpDate);
        
      }

      // Alternative: Calculate number of days between current date and start date
      const oneDay = 24 * 60 * 60 * 1000;
      const differenceInTime = customers[0].startDate.getTime() - currentDate.getTime();
      const differenceInDays = Math.round(Math.abs((currentDate - customers[0].startDate) / oneDay ))

      console.log("list", list, pickUpsPerYear, list.length,differenceInDays, customers[0].startDate, currentDate)




      res.json({
        sucess: true,
      })

    })
    .catch(err => next(err));
});

// GET Rides based on duration choosen by user

module.exports = router;