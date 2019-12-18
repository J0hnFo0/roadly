const express = require('express');
const router = express.Router();

const Ride = require('../models/Ride');

/* Set Date to '2019-12-02' to simulate pickup.
   Remove fixed to use application with current date. 
*/
function createUTC() {
  let date = new Date('2019-12-02')

  return new Date(
    Date.UTC(date.getUTCFullYear(), date.getMonth(), date.getDate())
  )
}

// GET Rides for current day
router.get('/', (req, res, next) => {
  const today = createUTC();
  Ride.find({ date: today })
    .populate('consumer')
    .then(rides => {
      res.json({
        rides
      });
    })
    .catch(err => next(err));
});

// TODO GET Rides based on duration choosen by user

// GET Ride by id
router.get('/:id', (req, res, next) => {
  const id = req.params.id;

  Ride.findById(id)
    .populate('consumer')
    .then(ride => {
      res.json(ride);
    })
    .catch(err => next(err));

});

// POST Ride 
router.post('/', (req, res, next) => {
  const body = req.body;

  const ride = {};

  Ride.create(ride)
    .then(() => {
      res.status(200);
    })
    .catch((err) => next(err))
});

// PUT Ride
router.put('/:id', (req, res, next) => {
  const id = req.params.id;
  const ride = req.body;

  Ride.findByIdAndUpdate(id, ride)
    .then(() => {
      res.status(200);
    })
    .catch(err => next(err));
});



module.exports = router;