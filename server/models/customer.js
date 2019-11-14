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
    city: String,
    zipcode: Number,
  },
  maxAmount: { type: Number },
  startDate: { type: Date },
  interval: {
    month: Number,
    week: Number,
    day: Number, // TODO
  },
  interval: { type: Number }, // TODO
  car: { type: Schema.Types.ObjectId, ref: 'Car' },
  tav: { type: String },
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