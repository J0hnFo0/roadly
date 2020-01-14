const express = require('express');
const router = express.Router();

// Require models
const Customer = require('../models/Customer');
const Ride = require('../models/Ride');
const RoutesHelper = require('../helper/routes');

// Helper function to create UTC date without time -> TODO: Move to separate file
function createUTC(date) {
  return new Date(
    Date.UTC(date.getUTCFullYear(), date.getMonth(), date.getDate())
  )
}

// GET one customer by search value (first name, last name, company name). If !value get list of all customers.
router.get('/', (req, res, next) => {
  if (req.query.value) {
    const value = req.query.value;
    const query = RoutesHelper.buildSearchQuery({
      fields: ['name.first', 'name.last', 'company'],
      value: value
    });

    Customer.find(query)
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
      const pickUpsPerYear = 365 / (customer.interval * 7);
      let ride = {
        consumer: customer._id,
        quantity: 0,
        state: 0
      }

      cStartDate = customer.startDate;

      let pickUpDate = new Date(
        Date.UTC(
          cStartDate.getUTCFullYear(),
          cStartDate.getMonth(),
          cStartDate.getDate()
        )
      );

      for (let i = 0; i < pickUpsPerYear; i++) {
        if (i === 0) {
          ride.date = pickUpDate.setDate(pickUpDate.getDate());
          Ride.create(ride);

          continue;
        }

        ride.date = pickUpDate.setDate(
          pickUpDate.getDate() + customer.interval * 7
        );

        Ride.create(ride);
      }

      res.json(customer);
    })
    .catch(err => {
      res.status(500).json(JSON.stringify(err));
    });
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

// DELETE customer by id and customer rides greater than day of deletion
router.delete('/:id', (req, res, next) => {
  const id = req.params.id;

  Customer.findByIdAndRemove(id)
    .then(() => {
      const today = createUTC(new Date());

      Ride.deleteMany({
        consumer: id,
        date: { $gt: today }
      })
        .then(() => {
          res.json({
            success: true
          });
        });
    })
    .catch(err => next(err));
})

module.exports = router;
