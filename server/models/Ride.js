const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/* Ride states
 0 = open
 1 = done
 2 = rejected
 3 = delegated (other date or other driver)
*/

const RideSchema = new mongoose.Schema({
  consumer: { type: Schema.Types.ObjectId, ref: 'Customer' },
  date: { type: Date },
  quantity: { type: Number },
  state: { type: Number },
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