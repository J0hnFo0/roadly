const express = require('express');
const router = express.Router();

// Require customer model
const Customer = require('../models/customer');

// GET one customer by "nachname". If !nachname get list of all
router.get('/', (req, res, next) => {
  if (req.query.nachname) {
    const lastName = req.query.nachname;

    Customer.find({ 'name.last': lastName })
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
  const customer = req.body;

  new Customer(customer)
    .save()
    .then(() => {
      res.json(customer);
    })
    .catch(err => next(err));
});

// PUT customer update by id 
router.put('/:id', (req, res, next) => {
  const id = req.params.id;
  const customer = req.body;

  Customer.findByIdAndUpdate(id, customer)
    .then(() => {
      res.json({customer});       
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
