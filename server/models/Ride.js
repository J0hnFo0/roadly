const mongoose = require('mongoose');

/* Ride states
 0 = offen
 1 = erledigt
 2 = abgelehnt
 3 = deligiert
*/

const RideSchema = new mongoose.Schema({
  consumer: { type: schema.types.ObjectId, ref: 'Customer' },
  date: { type: String },
  quantity: { type: mongoose.Decimal128 },
  state: {
    enum: [0, 1, 2, 3]
  },
},
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  });

const Ride = mongoose.model('Ride', RideSchema);

module.exports = Ride;