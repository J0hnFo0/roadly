const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CustomerSchema = new mongoose.Schema({
  company: { type: String },
  name: {
    first: String,
    last: String,
  },
  customerNb: { type: Number },
  adress: {
    street: String,
    number: Number,
    zipcode: Number,
    city: String,
  },
  maxAmount: { type: Number },
  startDate: { type: Date },
  interval: {
    month: Number,
    week: Number,
    day: Number, // TODO
  },
  tavArea: { type: String },
  pitSize: { type: Number},
  interval: { type: Number }, // TODO
  car: { type: Schema.Types.ObjectId, ref: 'Car' },
  notes: { type: String },
},
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  });

const Customer = mongoose.model('Customer', CustomerSchema);

module.exports = Customer;