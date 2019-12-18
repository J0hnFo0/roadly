const express = require('express');
const router = express.Router();

const Ride = require('../models/Ride');

// Helper function to create UTC date without time
function createUTC(date) {
  return new Date(
    Date.UTC(date.getUTCFullYear(), date.getMonth(), date.getDate())
  )
}

/* GET rides for current day. 
   Set Date to '2019-12-02' to simulate pickup.
   Remove fixed to use application with current date. 
*/
router.get('/', (req, res, next) => {
  const today = createUTC(new Date());
  Ride.find({ date: today })
    .populate('consumer')
    .then(rides => {
      res.json({
        rides
      });
    })
    .catch(err => next(err));
});

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
  const { customer, pickUpDate } = req.body;

  const pdateObject = new Date(pickUpDate)

  const ride = {
    date: createUTC(pdateObject),
    consumer: customer._id,
    quantity: customer.pitSize,
    state: 0,
  };

  Ride.create(ride)
    .then((ride) => {
      res.json(ride);
    })
    .catch((err) => next(err))
});

// PUT Ride
router.put('/:id', (req, res, next) => {
  const id = req.params.id;
  const ride = req.body;

  Ride.findByIdAndUpdate(id, ride)
    .then(() => {
      res.json({
        success: true
      });
    })
    .catch(err => next(err));
});



module.exports = router;