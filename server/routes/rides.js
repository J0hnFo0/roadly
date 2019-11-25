const express = require('express');
const router = express.Router();

const Ride = require('../models/Ride');

// JS calculates week days from: Sunday - Saturday : 0 - 6

// Change date to simulate pickup
function createUTC() {
  let date = new Date('2019-12-02')
  date = new Date(
    Date.UTC(date.getUTCFullYear(), date.getMonth(), date.getDate())
  )

  return date;
}

// GET Rides for current day
router.get('/', (req, res, next) => {
  const UTC = createUTC();
  Ride.find({ date: UTC })
    .populate('consumer')
    .then(rides => {
      res.json({
        rides
      });
    })
    .catch(err => next(err));
});

// GET Rides based on duration choosen by user

module.exports = router;