const express = require('express');
const router = express.Router();

// Require models
const Customer = require('../models/Customer');
const Ride = require('../models/Ride');

// Helper function to escape regex
function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

// GET one customer by "nachname". If !nachname get list of all
router.get('/', (req, res, next) => {
  if (req.query.nachname) {
    const lastName = req.query.nachname;

    Customer.find({
      'name.last': { $regex: escapeRegex(lastName), $options: 'i ' }
    })
      .then(data => {
        res.json(data);
      })
      .catch(err => next(err));

  } else {
    Customer.find()
      .then(customers => {
        res.json(customers);
      })
      .catch(err => next(err))
  }
});

// GET one customer by id 
router.get('/:id', (req, res, next) => {
  const id = req.params.id;

  Customer.findById(id)
    .then(data => {
      res.json(data)
    })
    .catch(err => next(err));
});

// POST new customer
router.post('/', (req, res, next) => {
  const newCustomer = req.body;

  new Customer(newCustomer)
    .save()
    .then((customer) => {

      let pickUpsPerYear = 365 / (customer.interval * 7);

      let ride = {
        consumer: customer._id,
        quantity: customer.pitSize,
        state: 0
      }

      cD = customer.startDate;

      let pickUpDate = new Date(  
        Date.UTC(cD.getUTCFullYear(), cD.getMonth(), cD.getDate())
      );

      for (let i = 0; i < pickUpsPerYear; i++) {
        ride.date = pickUpDate.setDate(
          pickUpDate.getDate() + customer.interval * 7
        );

        Ride.create(ride);
      }

      res.json(customer);
    })
    .catch(err => next(err));
});

// PUT customer update by id 
router.put('/:id', (req, res, next) => {
  const id = req.params.id;
  const customer = req.body;

  Customer.findByIdAndUpdate(id, customer)
    .then((customer) => {
      res.json({ customer });
    })
    .catch(err => next(err));
})

// DELETE customer by id 
router.delete('/:id', (req, res, next) => {
  const id = req.params.id;

  Customer.findByIdAndRemove(id)
    .then(() => {
      res.json({
        success: true
      });
    })
    .catch(err => next(err));
})

module.exports = router;
