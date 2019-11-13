const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CustomerSchema = new mongoose.Schema({
  name: {
    first: String,
    last: String,
  },
  customerNb: { type: Number },
  adress: {
    street: String,
    number: Number,
    city: String,
    zipcode: Number,
  },
  maxAmount: { type: Number },
  startDate: { type: Date },
  interval: {
    month: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    week: [0, 1, 2, 3],
    day: [0, 1, 3, 4, 5], // TODO
  },
  interval: { type: Number }, // TODO
  car: { type: Schema.Types.ObjectId, ref: 'Car' },
  tav: { type: String },
  notes: {type: String },
},
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  });

const Customer = mongoose.model('Customer', CustomerSchema);

module.exports = Customer;