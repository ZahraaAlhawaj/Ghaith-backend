const { Schema } = require('mongoose')

const pickupSchema = new Schema(
  {
    date: Date,
    time: String,
    type: String,
    quantity: Number,
    urgent: { type: Boolean, default: false },
    status: String,
    charity: { type: Schema.Types.ObjectId, ref: 'Charity' },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    amount: Number
  },
  {
    timestamps: true
  }
)

module.exports = pickupSchema
