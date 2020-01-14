const express = require('express');
const router = express.Router();

const Car = require('../models/Car');
const RoutesHelper = require('../helper/routes');

// GET all cars
router.get('/', (req, res, next) => {
  if (req.query.value) {
    const value = req.query.value;
    const query = RoutesHelper.buildSearchQuery({
      fields: ['name', 'brand', 'license'],
      value: value
    });

    Car.find(query)
      .then(cars => {
          res.json(cars);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(JSON.stringify(err));
      });
  } else {
    Car.find()
      .then(cars => {
          res.json(cars);
      })
      .catch(err => {
        res.status(500).json(JSON.stringify(err));
      });
  }
});

// GET one car by id
router.get('/:id', (req, res, next) => {
    const id = req.params.id;

    Car.findById(id)
    .then(car => {
        res.json(car);
    })
    .catch(err => {
      res.status(500).json(JSON.stringify(err));
    });
});

// POST new car
router.post('/', (req, res, next) => {
    const newCar = req.body;

    new Car(newCar)
        .save()
        .then(car => {
            res.json(car);
        })
    .catch(err => {
      res.status(500).json(JSON.stringify(err));
    });
});

// PUT car by id
router.put('/:id', (req, res, next) => {
    const id = req.params.id;
    const car = req.body;

    Car.findByIdAndUpdate(id, car)
        .then(car => {
            res.json(car);
        })
        .catch(err => next(err));
});

module.exports = router;
