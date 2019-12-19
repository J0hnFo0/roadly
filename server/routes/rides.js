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
   Set date to new Date('2019-12-02') to simulate pickup.
   Remove fixed date to use application with current date. 
   Comment state in db query to show/hide all rides.
*/
router.get('/', (req, res, next) => {
  const today = createUTC(new Date());

  Ride.find({
    date: { $lte: today },
    state: 0
  })
    .populate('consumer')
    .then(rides => {
      res.json({
        rides
      });
    })
    .catch(err => next(err));
});

// GET all rides based on filter set by user
router.get('/all', (req, res, next) => {
  const from = createUTC(new Date(req.query.from));
  const to = createUTC(new Date(req.query.to));
  
  Ride.find({
    date: { $gte: from},
    date: { $lte: to }
  })
    .populate('consumer')
    .then(rides => {
      res.json({
        rides
      });
    })
    .catch((err) => next(err))
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

// POST ride 
router.post('/', (req, res, next) => {
  const { customer, pickUpDate } = req.body;

  const pdateObject = new Date(pickUpDate)

  const ride = {
    date: createUTC(pdateObject),
    consumer: customer._id,
    quantity: 0,
    state: 0,
  };

  Ride.create(ride)
    .then((ride) => {
      res.json(ride);
    })
    .catch((err) => next(err))
});

// PUT ride
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