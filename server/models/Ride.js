const mongoose = require('mongoose');

/* Ride states
 0 = open
 1 = done
 2 = rejected
 3 = delegated (other date or other driver)
*/

const RideSchema = new mongoose.Schema({
  consumer: { type: schema.types.ObjectId, ref: 'Customer' },
  date: { type: Date },
  quantity: { type: mongoose.Decimal128 },
  state: {
    enum: [0, 1, 2, 3]
  },
  reasonForRejection: { type: String },
  reasonForDelegation: { type: String },
  notes: { type: String },
},
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  });

const Ride = mongoose.model('Ride', RideSchema);

module.exports = Ride;