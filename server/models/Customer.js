const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CustomerSchema = new mongoose.Schema({
  company: { type: String },
  name: {
    first: String,
    last: String,
  },
  customerNumber: { type: Number },
  adress: {
    street: String,
    number: Number,
    zipcode: Number,
    city: String,
  },
  startDate: { type: Date },
  tavArea: { type: String },
  pitSize: { type: Number},
  interval: { type: Number }, 
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