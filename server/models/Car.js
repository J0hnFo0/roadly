const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  name: { type: String },
  license: { type: String },
})

const Car = mongoose.model('Car', carSchema);

module.exports = Car;

