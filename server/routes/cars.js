const express = require('express');
const router = express.Router();

const Car = require('../models/Car');

// GET all cars
router.get('/', (req, res, next) => {
    Car.find()
    .then(cars => {
        res.json(cars);
    })
    .catch(err => next(err))
});

// GET one car by id
router.get('/:id', (req, res, next) => {
    const id = req.params.id;

    Car.findById(id)
    .then(car => {
        res.json(car);
    })
    .catch(err => next(err));
});

// POST new car
router.post('/', (req, res, next) => {
    const newCar = req.body;

    new Car(newCar)
        .save()
        .then(car => {
            res.json(car);
        })
        .catch(err => next(err));
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